import { Application, BadRequestException, NotFoundException } from 'https://deno.land/x/abc@v1.3.1/mod.ts';
import * as bnapi from 'https://deno.land/x/bnapi@0.9.4/mod.ts';
import { Cache } from './cache.ts';
import * as extra from './extra.ts';
import * as loc from './loc.ts';
const appBootedAt = Date.now();
const cache = new Cache();
cache.add('auth', async () => await bnapi.auth(Deno.env.get('BNAPI_KEY'), Deno.env.get('BNAPI_SECRET'), 'eu', 'en_GB'), {
    expMinutes: 23 * 60,
    expFuzzyPercent: 0
});
cache.add('races', async () => {
    const races = (await bnapi.wow.playableRaces()).map(e => ({
        id: e.id,
        name: e.name
    }));
    return races;
}, { expMinutes: -1 });
cache.add('classes', async () => {
    const classes = (await bnapi.wow.playableClasses()).map(e => ({
        id: e.id,
        name: e.name
    }));
    for (let i = 0; i < classes.length; i++) {
        const c = await bnapi.wow.playableClass(classes[i].id);
        classes[i].specs = c.specializations.map(e => e.id);
        classes[i].power = c.power_type.id;
        classes[i].media = (await bnapi.wow.playableClassMedia(c.media.id)).assets[0].value;
        if (c.id == 12) {
            classes[i].media = 'https://render-eu.worldofwarcraft.com/icons/56/classicon_demonhunter.jpg';
        }
    }
    return classes;
}, { expMinutes: -1 });
cache.add('specs', async () => {
    const specs = (await bnapi.wow.playableSpecializations()).character_specializations.map(e => ({
        id: e.id,
        name: e.name
    }));
    for (let i = 0; i < specs.length; i++) {
        const c = await bnapi.wow.playableSpecialization(specs[i].id);
        specs[i].role = c.role.type;
        specs[i].media = (await bnapi.wow.playableSpecializationMedia(c.media.id)).assets[0].value;
    }
    return specs;
}, { expMinutes: -1 });
async function getRecipe(id, name, tierId, cat) {
    const recipe = {
        id,
        name,
        tier: tierId,
        cat
    };
    const rec = await bnapi.wow.recipe(id);
    if (rec) {
        recipe.rank = rec.rank;
        const crafted = rec.alliance_crafted_item || rec.crafted_item;
        if (crafted) {
            const media = await bnapi.wow.itemMedia(crafted.id);
            recipe.item = {
                id: crafted.id,
                name: crafted.name,
                media: media?.assets?.shift()?.value,
                min: rec.crafted_quantity.value || rec.crafted_quantity.minimum,
                max: rec.crafted_quantity.value || rec.crafted_quantity.maximum
            };
        }
        if (!recipe.item || !recipe.item.media) {
            const media = await bnapi.wow.recipeMedia(rec.media.id);
            recipe.media = media?.assets?.shift()?.value;
        }
    }
    return recipe;
}
cache.add('professions', async () => {
    const result = {
        professions: [],
        recipes: [],
        recipeSearchIdx: '',
        recipeSearchPos: []
    };
    console.log('Updating professions...');
    for (const { id: profId } of await bnapi.wow.professions()) {
        const prof = await bnapi.wow.profession(profId);
        const media = await bnapi.wow.professionMedia(prof.media.id);
        const profession = {
            id: profId,
            name: prof.name,
            type: prof.type.type,
            tiers: [],
            media: media?.assets[0].value
        };
        for (const skillTier of prof.skill_tiers || []) {
            const tier = { id: skillTier.id, name: skillTier.name, cats: [] };
            profession.tiers.push(tier);
            const { categories } = await bnapi.wow.professionSkillTier(profId, tier.id);
            for (const { recipes, name: catName } of categories || []) {
                const cat = tier.cats.push(catName) - 1;
                for (const { id, name } of recipes) {
                    if (name.includes('|')) {
                        console.log('Recipe name has special characters and will be skipped:', id, name);
                    }
                    else {
                        const recipe = await getRecipe(id, name, tier.id, cat);
                        result.recipes.push(recipe);
                    }
                }
                console.log('Current recipes count:', result.recipes.length);
                await new Promise(r => setTimeout(r, 1000));
            }
        }
        result.professions.push(profession);
    }
    console.log('Building recipe search index...');
    result.recipes.sort((a, b) => a.name.toLocaleLowerCase().localeCompare(b.name.toLocaleLowerCase()));
    result.recipeSearchIdx = '|';
    for (let i = 0; i < result.recipes.length; i++) {
        result.recipeSearchPos.push(result.recipeSearchIdx.length);
        result.recipeSearchIdx += result.recipes[i].name.toLowerCase() + '|';
    }
    return result;
}, { expMinutes: -1 });
async function updateCharProfile(name, realm) {
    const profile = await bnapi.wow.characterProfile(realm, name);
    if (profile && profile.guild.id == 65456969) {
        const media = await bnapi.wow.characterMediaAssets(realm, name);
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
        };
    }
    else {
        throw new NotFoundException();
    }
}
async function updateCharStats(name, realm) {
    const stats = await bnapi.wow.characterAchievementStatistics(realm, name);
    if (!stats) {
        return {};
    }
    const arr = stats.reduce((a, c) => {
        a = [...a, ...(c.statistics || []), ...(c.sub_categories ? c.sub_categories.reduce((a, c) => {
                a = [...a, ...(c.statistics || [])];
                return a;
            }, []) : [])];
        return a;
    }, []);
    return arr
        .sort((a, b) => a.id - b.id)
        .reduce((a, c) => {
        a[c.id] = c.quantity;
        return a;
    }, {});
}
async function updateCharProfessions(name, realm) {
    const result = {
        professions: [],
        recipes: []
    };
    const profs = await bnapi.wow.characterProfessions(realm, name);
    for (const { profession, tiers } of [...(profs.primaries || []), ...(profs.secondaries || [])]) {
        result.professions.push(profession.id);
        for (const { known_recipes: recipes } of tiers || []) {
            for (const { id } of recipes || []) {
                result.recipes.push(id);
            }
        }
    }
    return result;
}
cache.add('roster', async () => {
    const members = await bnapi.wow.guildRoster('terokkar', 'knaipa-variativ');
    const maxLevelMembers = members.filter(e => e.character.level == 60);
    for (let i = 0; i < maxLevelMembers.length; i++) {
        const m = maxLevelMembers[i];
        const name = m.character.name;
        const realm = m.character.realm.slug;
        const profileKey = `char-profile-${name}-${realm}`.toLowerCase();
        if (!cache.has(profileKey)) {
            cache.add(profileKey, () => updateCharProfile(name, realm), { expMinutes: 30 });
            cache.add(`char-stats-${name}-${realm}`.toLowerCase(), () => updateCharStats(name, realm), { expMinutes: 40 });
            cache.add(`char-professions-${name}-${realm}`.toLowerCase(), () => updateCharProfessions(name, realm), { expMinutes: 50 });
        }
    }
    return maxLevelMembers.map(e => ({
        slug: `${e.character.name}-${e.character.realm.slug}`.toLocaleLowerCase(),
        name: e.character.name,
        realm: e.character.realm.slug,
        level: e.character.level,
        race: e.character.playable_race.id,
        class: e.character.playable_class.id,
        rank: e.rank > 0 ? e.rank : 1
    }));
}, { expMinutes: 10 });
await cache.update('auth');
await cache.update('roster');
await cache.load();
cache.live();
function searchRecipe(text, cursor = 0) {
    text = text.trim().toLowerCase();
    if (text.length < 2) {
        throw new BadRequestException('Search text too short');
    }
    const professions = cache.get('professions');
    const roster = cache.get('roster') || [];
    const results = [];
    while (cursor >= 0 && results.length < 50) {
        cursor = professions.recipeSearchIdx.indexOf(text, cursor);
        if (cursor >= 0) {
            const pipe = professions.recipeSearchIdx.lastIndexOf('|', cursor - 1);
            const idx = professions.recipeSearchPos.indexOf(pipe + 1);
            const recipe = professions.recipes[idx];
            const crafters = [];
            for (const { slug } of roster) {
                const charProfs = cache.get('char-professions-' + slug);
                if (charProfs && charProfs.recipes.includes(recipe.id)) {
                    const charProfile = cache.get('char-profile-' + slug);
                    crafters.push({
                        slug,
                        login: charProfile ? charProfile.login : 0
                    });
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
            });
            cursor++;
        }
    }
    return { results, text, cursor };
}
function calculateRanking(values, prop) {
    const ranking = [];
    values.sort((a, b) => (b[prop] || 0) - (a[prop] || 0) || a.slug.localeCompare(b.slug));
    for (let j = -1, i = 0; i < values.length; i++) {
        if (j == -1 || ranking[j].value != values[i][prop]) {
            j++;
            if (j == 10) {
                break;
            }
            ranking.push({
                rank: j + 1,
                chars: [values[i].slug],
                value: values[i][prop]
            });
        }
        else {
            ranking[j].chars.push(values[i].slug);
        }
    }
    return ranking;
}
function generateRankings() {
    const roster = cache.get('roster') || [];
    const rosterWithoutAlts = roster.filter(e => e.rank != 5);
    const stats = roster.map(({ slug }) => {
        const stat = cache.get('char-stats-' + slug);
        return { slug, ...stat };
    });
    const statsWithoutAlts = rosterWithoutAlts.map(({ slug }) => {
        const stat = cache.get('char-stats-' + slug);
        return { slug, ...stat };
    });
    const ranks = extra.ranks().map(rank => {
        let values = [];
        let valueKey = 0;
        if (rank.id == extra.RankId.AchievementPoints) {
            values = rosterWithoutAlts.map(({ slug }) => {
                const profile = cache.get('char-profile-' + slug);
                return { slug, achiPoints: profile?.achiPoints || 0 };
            });
            valueKey = 'achiPoints';
        }
        if (rank.id == extra.RankId.ItemLevel) {
            values = roster.map(({ slug }) => {
                const profile = cache.get('char-profile-' + slug);
                return { slug, equILvl: profile?.equILvl || 0 };
            });
            valueKey = 'equILvl';
        }
        if (rank.id == extra.RankId.RecipesKnown) {
            values = roster.map(({ slug }) => {
                const prof = cache.get('char-professions-' + slug);
                return { slug, count: prof?.recipes.length || 0 };
            });
            valueKey = 'count';
        }
        if (rank.statId) {
            values = rank.statAccountWide ? statsWithoutAlts : stats;
            valueKey = rank.statId;
        }
        return {
            icon: rank.icon,
            name: rank.name,
            desc: rank.desc,
            ranking: calculateRanking(values, valueKey)
        };
    });
    return ranks;
}
const appPort = 8080;
const appStartedAt = Date.now();
const app = new Application();
app.get('/info', () => ({
    uptime: Math.ceil((Date.now() - appStartedAt) / 1000),
    boottime: (appStartedAt - appBootedAt) / 1000,
    ...cache.info()
}));
app.get('/live', () => cache.live());
app.get('/die', () => cache.die());
app.get('/reset/:key', c => cache.reset(c.params.key));
app.get('/races', () => cache.get('races').map(r => ({
    ...r,
    loc: loc.race(r.id)
})).filter(r => r.loc));
app.get('/classes', () => cache.get('classes').map(c => ({
    ...c,
    loc: loc.clazz(c.id)
})));
app.get('/specs', () => cache.get('specs'));
app.get('/professions', () => cache.get('professions').professions.map(p => ({
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
})));
app.get('/roster', () => cache.get('roster'));
app.get('/char/:char', c => {
    const key = 'char-profile-' + decodeURIComponent(c.params.char).toLowerCase();
    const { spec, login, avatar, inset } = cache.get(key);
    return {
        spec,
        login,
        avatar,
        inset
    };
});
app.get('/rankings', () => {
    try {
        console.time();
        return generateRankings();
    }
    finally {
        console.timeEnd();
    }
});
app.get('/shadowlands-legendary-recipes', () => extra.shadowlandsLegendaryRecipes());
app.get('/search-recipe', c => {
    try {
        const text = c.url.searchParams.get('text') || '';
        const cursor = parseInt(c.url.searchParams.get('cursor') || '0') || 0;
        console.log(`Search recipe containing "${text}" from ${cursor}`);
        console.time();
        return searchRecipe(text, cursor);
    }
    finally {
        console.timeEnd();
    }
});
app.pre(next => c => {
    console.log(`${c.method} ${decodeURIComponent(c.path)}`);
    c.response.headers.set('Access-Control-Allow-Origin', '*');
    return next(c);
});
app.start({ port: appPort });
console.log(`Running server http://localhost:${appPort}/... 🦕`);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsV0FBVyxFQUFFLG1CQUFtQixFQUFFLGlCQUFpQixFQUFFLE1BQU0sdUNBQXVDLENBQUE7QUFDM0csT0FBTyxLQUFLLEtBQUssTUFBTSx3Q0FBd0MsQ0FBQTtBQUMvRCxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sWUFBWSxDQUFBO0FBQ2xDLE9BQU8sS0FBSyxLQUFLLE1BQU0sWUFBWSxDQUFBO0FBQ25DLE9BQU8sS0FBSyxHQUFHLE1BQU0sVUFBVSxDQUFBO0FBSS9CLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQTtBQUU5QixNQUFNLEtBQUssR0FBRyxJQUFJLEtBQUssRUFBRSxDQUFBO0FBRXpCLEtBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLEtBQUssSUFBSSxFQUFFLENBQUMsTUFBTSxLQUFLLENBQUMsSUFBSSxDQUMxQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUUsRUFDMUIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFFLEVBQzdCLElBQUksRUFDSixPQUFPLENBQ1YsRUFBRTtJQUNDLFVBQVUsRUFBRSxFQUFFLEdBQUcsRUFBRTtJQUNuQixlQUFlLEVBQUUsQ0FBQztDQUNyQixDQUFDLENBQUE7QUFPRixLQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxLQUFLLElBQXFCLEVBQUU7SUFDM0MsTUFBTSxLQUFLLEdBQVcsQ0FBQyxNQUFNLEtBQUssQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzlELEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRTtRQUNSLElBQUksRUFBRSxDQUFDLENBQUMsSUFBSTtLQUNmLENBQUMsQ0FBQyxDQUFB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