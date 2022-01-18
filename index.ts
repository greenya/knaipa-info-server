import { Application, BadRequestException, NotFoundException } from 'https://deno.land/x/abc/mod.ts'
import * as bnapi from 'https://deno.land/x/bnapi/mod.ts'
import { Cache } from './cache.ts'
import * as extra from './extra.ts'
import * as loc from './loc.ts'

// ###############################################################################

const appBootedAt = Date.now()

const cache = new Cache()

cache.add('auth', async () => await bnapi.auth(
    Deno.env.get('BNAPI_KEY')!,
    Deno.env.get('BNAPI_SECRET')!,
    'eu',
    'en_GB'
), {
    expMinutes: 23 * 60, // battle.net api token valid for 24 hours, lets use 23
    expFuzzyPercent: 0
})

interface Race {
    id: number,
    name: string
}

cache.add('races', async (): Promise<Race[]> => {
    const races: Race[] = (await bnapi.wow.playableRaces()).map(e => ({
        id: e.id,
        name: e.name
    }))

    return races
}, { expMinutes: -1 })

interface Class {
    id: number,
    name: string,
    specs?: number[],
    power?: number,
    media?: string
}

cache.add('classes', async (): Promise<Class[]> => {
    const classes: Class[] = (await bnapi.wow.playableClasses()).map(e => ({
        id: e.id,
        name: e.name
    }))

    for (let i = 0; i < classes.length; i++) {
        const c = await bnapi.wow.playableClass(classes[i].id)
        classes[i].specs = c.specializations.map(e => e.id)
        classes[i].power = c.power_type.id
        classes[i].media = (await bnapi.wow.playableClassMedia(c.media.id)).assets[0].value

        // Demon Hunter for some reason has wrong icon; so we fix it here; check in future if this is still needed
        if (c.id == 12) {
            classes[i].media = 'https://render-eu.worldofwarcraft.com/icons/56/classicon_demonhunter.jpg'
        }
    }

    return classes
}, { expMinutes: -1 })

interface Spec {
    id: number,
    name: string,
    role?: string,
    media?: string
}

cache.add('specs', async (): Promise<Spec[]> => {
    const specs: Spec[] = (await bnapi.wow.playableSpecializations()).character_specializations.map(e => ({
        id: e.id,
        name: e.name
    }))

    for (let i = 0; i < specs.length; i++) {
        const c = await bnapi.wow.playableSpecialization(specs[i].id)
        specs[i].role = c.role.type
        specs[i].media = (await bnapi.wow.playableSpecializationMedia(c.media.id)).assets[0].value
    }

    return specs
}, { expMinutes: -1 })

interface ProfessionTier {
    id: number,
    name: string,
    cats: string[]
}

interface Profession {
    id: number,
    name: string,
    type: string,
    tiers: ProfessionTier[],
    media: string
}

interface CraftedItem {
    id: number,
    name: string,
    media?: string,
    min: number,
    max: number
}

interface Recipe {
    id: number,
    name: string,
    tier: number,
    cat: number,
    rank?: number,
    item?: CraftedItem,
    media?: string
}

interface Professions {
    professions: Profession[],
    recipes: Recipe[],
    recipeSearchIdx: string,
    recipeSearchPos: number[]
}

async function getRecipe(id: number, name: string, tierId: number, cat: number) {
    const recipe: Recipe = {
        id,
        name,
        tier: tierId,
        cat
    }

    const rec = await bnapi.wow.recipe(id)
    if (rec) {
        recipe.rank = rec.rank

        const crafted = rec.alliance_crafted_item || rec.crafted_item
        if (crafted) {
            const media = await bnapi.wow.itemMedia(crafted.id)
            recipe.item = {
                id: crafted.id,
                name: crafted.name,
                media: media?.assets?.shift()?.value,
                min: rec.crafted_quantity.value || rec.crafted_quantity.minimum!,
                max: rec.crafted_quantity.value || rec.crafted_quantity.maximum!
            }
        }

        if (!recipe.item || !recipe.item.media) {
            const media = await bnapi.wow.recipeMedia(rec.media.id)
            recipe.media = media?.assets?.shift()?.value
        }
    }

    return recipe
}

cache.add('professions', async (): Promise<Professions> => {
    const result: Professions = {
        professions: [],
        recipes: [],
        recipeSearchIdx: '',
        recipeSearchPos: []
    }

    console.log('Updating professions...')

    for (const { id: profId } of await bnapi.wow.professions()) {
        const prof = await bnapi.wow.profession(profId)
        const media = await bnapi.wow.professionMedia(prof.media.id)

        const profession: Profession = {
            id: profId,
            name: prof.name,
            type: prof.type.type,
            tiers: [],
            media: media?.assets[0].value
        }

        for (const skillTier of prof.skill_tiers || []) {
            const tier: ProfessionTier = { id: skillTier.id, name: skillTier.name, cats: [] }
            profession.tiers.push(tier)

            const { categories } = await bnapi.wow.professionSkillTier(profId, tier.id)
            for (const { recipes, name: catName } of categories || []) {
                const cat = tier.cats.push(catName) - 1
                for (const { id, name } of recipes) {
                    if (name.includes('|')) {
                        console.log('Recipe name has special characters and will be skipped:', id, name)
                    } else {
                        const recipe = await getRecipe(id, name, tier.id, cat)
                        result.recipes.push(recipe)
                    }
                }
                console.log('Current recipes count:', result.recipes.length)
                await new Promise(r => setTimeout(r, 1000))
            }
        }

        result.professions.push(profession)
    }

    console.log('Building recipe search index...')

    result.recipes.sort((a, b) => a.name.toLocaleLowerCase().localeCompare(b.name.toLocaleLowerCase()))
    result.recipeSearchIdx = '|'

    for (let i = 0; i < result.recipes.length; i++) {
        result.recipeSearchPos.push(result.recipeSearchIdx.length)
        result.recipeSearchIdx += result.recipes[i].name.toLowerCase() + '|'
    }

    return result
}, { expMinutes: -1 })

interface CharProfile {
    spec: number,
    login: number,
    avatar?: string,
    inset?: string,
    main?: string,
    mainRaw?: string,
    gender: string,
    exp: number,
    title?: string,
    achiPoints: number,
    avgILvl: number,
    equILvl: number,
    covenant?: number,
    renown?: number
}

async function updateCharProfile(name: string, realm: string): Promise<CharProfile> {
    const profile = await bnapi.wow.characterProfile(realm, name)
    if (profile && profile.guild.id == 65456969) { // Knaipa Variativ
        const media = await bnapi.wow.characterMediaAssets(realm, name)
        return {
            spec: profile.active_spec.id,
            login: profile.last_login_timestamp,
            avatar: media?.find(e => e.key == 'avatar')?.value,
            inset: media?.find(e => e.key == 'inset')?.value,
            main: media?.find(e => e.key == 'main')?.value,
            mainRaw: media?.find(e => e.key == 'main-raw')?.value,
            gender: profile.gender.type,
            exp: profile.experience,
            title: profile.active_title?.display_string,
            achiPoints: profile.achievement_points,
            avgILvl: profile.average_item_level,
            equILvl: profile.equipped_item_level,
            covenant: profile.covenant_progress?.chosen_covenant.id,
            renown: profile.covenant_progress?.renown_level
        }
    } else {
        throw new NotFoundException()
    }
}

interface CharStats {
    [_:number]: number
}

async function updateCharStats(name: string, realm: string): Promise<CharStats> {
    const stats = await bnapi.wow.characterAchievementStatistics(realm, name)
    if (!stats) {
        return {}
    }

    // deno-lint-ignore no-explicit-any
    const arr = stats.reduce<any[]>((a, c) => {
        a = [ ...a, ...(c.statistics || []), ...(
            c.sub_categories ? c.sub_categories.reduce<unknown[]>((a, c) => {
                a = [ ...a, ...(c.statistics || []) ]
                return a
            }, []) : []
        ) ]
        return a
    }, [])

    return arr
        .sort((a, b) => a.id - b.id)
        .reduce<CharStats>((a, c) => {
            a[c.id] = c.quantity
            return a
        }, {})
}

interface CharProfessions {
    professions: number[],
    recipes: number[]
}

async function updateCharProfessions(name: string, realm: string): Promise<CharProfessions> {
    const result: CharProfessions = {
        professions: [],
        recipes: []
    }

    const profs = await bnapi.wow.characterProfessions(realm, name)
    for (const { profession, tiers } of [ ...(profs.primaries || []), ...(profs.secondaries || []) ]) {
        result.professions.push(profession.id)
        for (const { known_recipes: recipes } of tiers || []) {
            for (const { id } of recipes || []) {
                result.recipes.push(id)
            }
        }
    }

    return result
}

interface CharRoster {
    slug: string,
    name: string,
    realm: string,
    level: number,
    race: number,
    class: number,
    rank: number
}

cache.add('roster', async (): Promise<CharRoster[]> => {
    const members = await bnapi.wow.guildRoster('terokkar', 'knaipa-variativ')
    const maxLevelMembers = members.filter(e => e.character.level == 60)

    for (let i = 0; i < maxLevelMembers.length; i++) {
        const m = maxLevelMembers[i]
        const name = m.character.name
        const realm = m.character.realm.slug
        const profileKey = `char-profile-${name}-${realm}`.toLowerCase()
        if (!cache.has(profileKey)) {
            cache.add(
                profileKey,
                () => updateCharProfile(name, realm),
                { expMinutes: 30 }
            )
            cache.add(
                `char-stats-${name}-${realm}`.toLowerCase(),
                () => updateCharStats(name, realm),
                { expMinutes: 40 }
            )
            cache.add(
                `char-professions-${name}-${realm}`.toLowerCase(),
                () => updateCharProfessions(name, realm),
                { expMinutes: 50 }
            )
        }
    }

    return maxLevelMembers.map(e => ({
        slug: `${e.character.name}-${e.character.realm.slug}`.toLocaleLowerCase(),
        name: e.character.name,
        realm: e.character.realm.slug,
        level: e.character.level,
        race: e.character.playable_race.id,
        class: e.character.playable_class.id,
        rank: e.rank > 0 ? e.rank : 1 // make guild master (0) appear as officer (1)
    }))
}, { expMinutes: 10 })

await cache.update('auth') // required to do any bnapi request
await cache.update('roster') // populate cache with character keys
await cache.load()

cache.live()

// ###############################################################################

function searchRecipe(text: string, cursor = 0) {
    text = text.trim().toLowerCase()
    if (text.length < 2) {
        throw new BadRequestException('Search text too short')
    }

    const professions = cache.get<Professions>('professions')!
    const roster = cache.get<CharRoster[]>('roster') || []
    const results: {
        id: number,
        name: string,
        tier: number,
        cat: number,
        rank?: number,
        item?: CraftedItem,
        media?: string,
        crafters: string[]
    }[] = []

    while (cursor >= 0 && results.length < 50) {
        cursor = professions.recipeSearchIdx.indexOf(text, cursor)
        if (cursor >= 0) {
            const pipe = professions.recipeSearchIdx.lastIndexOf('|', cursor - 1)
            const idx = professions.recipeSearchPos.indexOf(pipe + 1)
            const recipe = professions.recipes[idx]

            const crafters: { slug: string, login: number }[] = []
            for (const { slug } of roster) {
                const charProfs = cache.get<CharProfessions>('char-professions-' + slug)
                if (charProfs && charProfs.recipes.includes(recipe.id)) {
                    const charProfile = cache.get<CharProfile>('char-profile-' + slug)
                    crafters.push({
                        slug,
                        login: charProfile ? charProfile.login : 0
                    })
                }
            }

            results.push({
                id: recipe.id,
                name: recipe.name,
                tier: recipe.tier,
                cat: recipe.cat,
                rank: recipe.rank,
                item: recipe.item,
                media: recipe.media,
                crafters: crafters.sort((a, b) => b.login - a.login).map(c => c.slug)
            })

            cursor++
        }
    }

    return { results, text, cursor }
}

// deno-lint-ignore no-explicit-any
function calculateRanking(values: any[], prop: string | number) {
    const ranking: {
        rank: number,
        chars: string[],
        value: number
    }[] = []

    values.sort((a, b) => (b[prop] || 0) - (a[prop] || 0) || a.slug.localeCompare(b.slug))

    for (let j = -1, i = 0; i < values.length; i++) {
        if (j == -1 || ranking[j].value != values[i][prop]) {
            j++
            if (j == 10) { break } // limit list to first 10 ranks; can be removed when doing popup with full list
            ranking.push({
                rank: j + 1,
                chars: [ values[i].slug ],
                value: values[i][prop]
            })
        } else {
            ranking[j].chars.push(values[i].slug)
        }
    }

    return ranking
}

function generateRankings() {
    const roster = cache.get<CharRoster[]>('roster') || []
    const rosterWithoutAlts = roster.filter(e => e.rank != 5) // "5" is for "alt" guild rank

    const stats = roster.map(({ slug }) => {
        const stat = cache.get<CharStats>('char-stats-' + slug)
        return { slug, ...stat }
    })

    const statsWithoutAlts = rosterWithoutAlts.map(({ slug }) => {
        const stat = cache.get<CharStats>('char-stats-' + slug)
        return { slug, ...stat }
    })

    const ranks = extra.ranks().map(rank => {
        // deno-lint-ignore no-explicit-any
        let values: any[] = []
        let valueKey: string | number = 0

        if (rank.id == extra.RankId.AchievementPoints) {
            values = rosterWithoutAlts.map(({ slug }) => {
                const profile = cache.get<CharProfile>('char-profile-' + slug)
                return { slug, achiPoints: profile?.achiPoints || 0 }
            })
            valueKey = 'achiPoints'
        }

        if (rank.id == extra.RankId.ItemLevel) {
            values = roster.map(({ slug }) => {
                const profile = cache.get<CharProfile>('char-profile-' + slug)
                return { slug, equILvl: profile?.equILvl || 0 }
            })
            valueKey = 'equILvl'
        }

        if (rank.id == extra.RankId.RecipesKnown) {
            values = roster.map(({ slug }) => {
                const prof = cache.get<CharProfessions>('char-professions-' + slug)
                return { slug, count: prof?.recipes.length || 0 }
            })
            valueKey = 'count'
        }

        if (rank.statId) {
            values = rank.statAccountWide ? statsWithoutAlts : stats
            valueKey = rank.statId
        }

        return {
            icon: rank.icon,
            name: rank.name,
            desc: rank.desc,
            ranking: calculateRanking(values, valueKey)
        }
    })

    return ranks
}

// ###############################################################################

const appPort = 8080
const appStartedAt = Date.now()

const app = new Application()

app.get('/info', () => ({
    uptime: Math.ceil((Date.now() - appStartedAt) / 1000),
    boottime: (appStartedAt - appBootedAt) / 1000,
    ...cache.info()
}))

app.get('/live', () => cache.live())
app.get('/die', () => cache.die())
app.get('/reset/:key', c => cache.reset(c.params.key))

app.get('/races', () => cache.get<Race[]>('races')!.map(r => ({
    ...r,
    loc: loc.race(r.id)
})).filter(r => r.loc))

app.get('/classes', () => cache.get<Class[]>('classes')!.map(c => ({
    ...c,
    loc: loc.clazz(c.id)
})))

app.get('/specs', () => cache.get('specs'))

app.get('/professions', () => cache.get<Professions>('professions')!.professions.map(p => ({
    ...p,
    tiers: p.tiers.map(t => ({
        ...t,
        cats: t.cats.map(c => ({
            name: c,
            loc: loc.text(c)
        })),
        loc: loc.professionTier(t.id)
    })),
    loc: loc.profession(p.id)
})))

app.get('/roster', () => cache.get('roster'))

app.get('/char/:char', c => {
    const key = 'char-profile-' + decodeURIComponent(c.params.char).toLowerCase()
    const { spec, login, avatar, inset } = cache.get<CharProfile>(key)!
    return {
        spec,
        login,
        avatar,
        inset
    }
})

app.get('/rankings', () => {
    try {
        console.time()
        return generateRankings()
    } finally {
        console.timeEnd()
    }
})

app.get('/shadowlands-legendary-recipes', () => extra.shadowlandsLegendaryRecipes())

app.get('/search-recipe', c => {
    try {
        const text = c.url.searchParams.get('text') || ''
        const cursor = parseInt(c.url.searchParams.get('cursor') || '0') || 0
        console.log(`Search recipe containing "${text}" from ${cursor}`)
        console.time()
        return searchRecipe(text, cursor)
    } finally {
        console.timeEnd()
    }
})

app.pre(next => c => {
    console.log(`${c.method} ${decodeURIComponent(c.path)}`)
    c.response.headers.set('Access-Control-Allow-Origin', '*')
    return next(c)
})

app.start({ port: appPort })
console.log(`Running server http://localhost:${appPort}/... 🦕`)
