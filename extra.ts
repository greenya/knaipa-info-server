const knownShadowlandsLegendaryRecipes = [
    {
        group: 'для всіх',
        items: [
            { slot: 'намисто',      name: 'Shadowghast Necklace',   ranks: [ 44871, 45241, 45243, 45590 ] },
            { slot: 'каблучка',     name: 'Shadowghast Ring',       ranks: [ 44870, 45240, 45242, 45591 ] },
            { slot: 'накидка',      name: 'Grim-Veiled Cape',       ranks: [ 42863, 45246, 45255, 45608 ] },
        ]
    },
    {
        group: 'полотно',
        items: [
            { slot: 'шолом',        name: 'Grim-Veiled Hood',       ranks: [ 42861, 45248, 45257, 45612 ] },
            { slot: 'наплічники',   name: 'Grim-Veiled Spaulders',  ranks: [ 42859, 45250, 45259, 45614 ] },
            { slot: 'нагрудник',    name: 'Grim-Veiled Robe',       ranks: [ 42864, 45245, 45254, 45609 ] },
            { slot: 'зап\'ястя',    name: 'Grim-Veiled Bracers',    ranks: [ 42857, 45252, 45261, 45616 ] },
            { slot: 'рукавиці',     name: 'Grim-Veiled Mittens',    ranks: [ 42862, 45247, 45256, 45611 ] },
            { slot: 'пояс',         name: 'Grim-Veiled Belt',       ranks: [ 42858, 45251, 45260, 45615 ] },
            { slot: 'штани',        name: 'Grim-Veiled Pants',      ranks: [ 42860, 45249, 45258, 45613 ] },
            { slot: 'взуття',       name: 'Grim-Veiled Sandals',    ranks: [ 42856, 45244, 45253, 45610 ] },
        ]
    },
    {
        group: 'шкіра',
        items: [
            { slot: 'шолом',        name: 'Umbrahide Helm',         ranks: [ 42505, 45211, 45227, 45595 ] },
            { slot: 'наплічники',   name: 'Umbrahide Pauldrons',    ranks: [ 42507, 45213, 45229, 45597 ] },
            { slot: 'нагрудник',    name: 'Umbrahide Vest',         ranks: [ 42503, 45209, 45225, 45592 ] },
            { slot: 'зап\'ястя',    name: 'Umbrahide Armguards',    ranks: [ 42509, 45215, 45231, 45599 ] },
            { slot: 'рукавиці',     name: 'Umbrahide Gauntlets',    ranks: [ 42504, 45210, 45226, 45594 ] },
            { slot: 'пояс',         name: 'Umbrahide Waistguard',   ranks: [ 42508, 45214, 45230, 45598 ] },
            { slot: 'штани',        name: 'Umbrahide Leggings',     ranks: [ 42506, 45212, 45228, 45596 ] },
            { slot: 'взуття',       name: 'Umbrahide Treads',       ranks: [ 42502, 45208, 45224, 45593 ] },
        ]
    },
    {
        group: 'кольчуга',
        items: [
            { slot: 'шолом',        name: 'Boneshatter Helm',       ranks: [ 42513, 45219, 45235, 45603 ] },
            { slot: 'наплічники',   name: 'Boneshatter Pauldrons',  ranks: [ 42515, 45221, 45237, 45605 ] },
            { slot: 'нагрудник',    name: 'Boneshatter Vest',       ranks: [ 42511, 45217, 45233, 45600 ] },
            { slot: 'зап\'ястя',    name: 'Boneshatter Armguards',  ranks: [ 42517, 45223, 45239, 45607 ] },
            { slot: 'рукавиці',     name: 'Boneshatter Gauntlets',  ranks: [ 42512, 45218, 45234, 45602 ] },
            { slot: 'пояс',         name: 'Boneshatter Waistguard', ranks: [ 42516, 45222, 45238, 45606 ] },
            { slot: 'штани',        name: 'Boneshatter Greaves',    ranks: [ 42514, 45220, 45236, 45604 ] },
            { slot: 'взуття',       name: 'Boneshatter Treads',     ranks: [ 42510, 45216, 45232, 45601 ] },
        ]
    },
    {
        group: 'лати',
        items: [
            { slot: 'шолом',        name: 'Shadowghast Helm',           ranks: [ 42384, 45196, 45204, 45585 ] },
            { slot: 'наплічники',   name: 'Shadowghast Pauldrons',      ranks: [ 42386, 45194, 45202, 45587 ] },
            { slot: 'нагрудник',    name: 'Shadowghast Breastplate',    ranks: [ 42381, 45199, 45207, 45582 ] },
            { slot: 'зап\'ястя',    name: 'Shadowghast Armguards',      ranks: [ 42388, 45192, 45200, 45589 ] },
            { slot: 'рукавиці',     name: 'Shadowghast Gauntlets',      ranks: [ 42383, 45197, 45205, 45584 ] },
            { slot: 'пояс',         name: 'Shadowghast Waistguard',     ranks: [ 42387, 45193, 45201, 45588 ] },
            { slot: 'штани',        name: 'Shadowghast Greaves',        ranks: [ 42385, 45195, 45203, 45586 ] },
            { slot: 'взуття',       name: 'Shadowghast Sabatons',       ranks: [ 42382, 45198, 45206, 45583 ] },
        ]
    },
]

export function shadowlandsLegendaryRecipes() {
    return knownShadowlandsLegendaryRecipes
}

export enum RankId {
    AchievementPoints = 7001,
    ItemLevel,
    RecipesKnown,
    CookingRecipesKnown,
    QuestsCompleted,
    DailyQuestsCompleted,
    FlightPathsTaken,
    FishCaught,
    SummonsAccepted,
    NumberOfTimesHearthed,
    PetBattlesWonAtMaxLevel,
    TotalKills,
    TotalDeaths,
    DeathsFromFalling,
    DeathsFromDrowning,
    DeathsFromFireAndLava,
    TotalDeathsFromOtherPlayers,
    TotalHonorableKills,
    DuelsWon,
    BattlegroundsWon,
    ArenasWon,
    Highest2v2PersonalRating,
    Highest3v3PersonalRating
}

interface Rank {
    id: RankId,
    icon: string, // icons: https://www.wowhead.com/icons/
    name: string,
    desc: string,
    statId?: number,
    statAccountWide?: boolean
}

// { name: 'Коняр',                    desc: 'Найбільша кількість засобів пересування' },                   // ? char-mounts
// { name: 'Штукар',                   desc: 'Найбільша кількість сокетів в пердметах' },                   // ? char-equipment
// { name: 'Незруйновний',             desc: 'Найбільша кількість пердметів з бонусом Indestructible' },    // ? char-equipment
// { name: 'Приборкувач звірів',       desc: 'Найбільша кількість приборканих тварин (лише для мисливців)' }, // ? char-hunter-pets
// { name: 'Володар звіряток',         desc: 'Найбільша кількість бойових звіряток' },                      // ? char-battle-pets
// { name: 'Вбивця босів',             desc: 'Найбільша кількість вбитих рейдових босів' },                 // ? char-stats
// { name: 'Підкорювач підземель',     desc: 'Найбільший закритий вчасно м+ ключ' },                        // ???
// { name: 'Відвідувач підземель',     desc: 'Найбільша кількість відвіданих підземель' },                  // ! char-stats / #932 Total 5-player dungeons entered
// { name: 'Винищувач звіряток',       desc: 'Найбільша кількість вбитих звіряток' },                       // ! char-stats / #108 Critters killed
// { name: 'Убивця',                   desc: 'Найбільша кількість почесних вбивств на полях битв' },        // ! char-stats / #382 Battleground Honorable Kills

const knownRanks: Rank[] = [
    {
        id: RankId.AchievementPoints,
        icon: 'inv_belt_armor_waistoftime_d_01',
        name: 'Багатосторонній',
        desc: 'Найбільша кількість балів досягнень'
    },
    {
        id: RankId.ItemLevel,
        icon: 'achievement_explore_argus',
        name: 'Підготовлений',
        desc: 'Найбільший рівень споряджених предметів'
    },
    {
        id: RankId.PetBattlesWonAtMaxLevel,
        icon: 'spell_hunter_lonewolf',
        name: 'Криваволапий',
        desc: 'Найбільша кількість перемог в битвах звіряток на максимальному рівні',
        statId: 8278,
        statAccountWide: true
    },
    {
        id: RankId.QuestsCompleted,
        icon: 'inv_artifact_tome01',
        name: 'Обізнаний',
        desc: 'Найбільша кількість виконаних завдань',
        statId: 98
    },
    {
        id: RankId.DailyQuestsCompleted,
        icon: 'inv_worserobot',
        name: 'Невтомний',
        desc: 'Найбільша кількість виконаних щоденних завдань',
        statId: 97
    },
    {
        id: RankId.RecipesKnown,
        icon: 'inv_misc_scrollrolled03d',
        name: 'Майстерний',
        desc: 'Найбільша кількість вивчених рецептів всіх професій'
    },
    {
        id: RankId.CookingRecipesKnown,
        icon: 'inv_misc_food_mango_ice',
        name: 'Гіперкулінар',
        desc: 'Найбільша кількість вивчених кулінарних рецептів',
        statId: 1745
    },
    {
        id: RankId.FishCaught,
        icon: 'inv_fishingpole_03',
        name: 'Електрорибалка',
        desc: 'Найбільша кількість зловлених риб',
        statId: 1518
    },
    {
        id: RankId.FlightPathsTaken,
        icon: 'ability_mount_gyrocoptor',
        name: 'Автопілот',
        desc: 'Найбільша кількість маршрутних польотів',
        statId: 349
    },
    {
        id: RankId.SummonsAccepted,
        icon: 'achievement_dungeon_ulduarraid_titan_01',
        name: 'Нерухомий',
        desc: 'Найбільша кількість прийнятих прикликань',
        statId: 2277
    },
    {
        id: RankId.NumberOfTimesHearthed,
        icon: 'achievement_guildperk_hastyhearth',
        name: 'Домовий',
        desc: 'Найбільша кількість використань каменю Вогнища',
        statId: 353
    },
    {
        id: RankId.TotalKills,
        icon: 'ability_hunter_rapidkilling',
        name: 'Нещадний',
        desc: 'Найбільша кількість вбивств',
        statId: 1197
    },
    {
        id: RankId.TotalDeaths,
        icon: 'ability_vanish',
        name: 'Напівпривид',
        desc: 'Найбільша кількість смертей',
        statId: 60
    },
    {
        id: RankId.DeathsFromFalling,
        icon: 'spell_magic_featherfall',
        name: 'Нелітаючий',
        desc: 'Найбільша кількість смертей від падіння',
        statId: 114
    },
    {
        id: RankId.DeathsFromDrowning,
        icon: 'spell_shadow_demonbreath',
        name: 'Глибоководний',
        desc: 'Найбільша кількість смертей від втоплення',
        statId: 112
    },
    {
        id: RankId.DeathsFromFireAndLava,
        icon: 'spell_fire_moltenblood',
        name: 'Засмажений',
        desc: 'Найбільша кількість смертей від вогню та лави',
        statId: 115
    },
    {
        id: RankId.TotalDeathsFromOtherPlayers,
        icon: 'trade_archaeology_troll_voodoodoll',
        name: 'Манекен',
        desc: 'Найбільша кількість смертей від інших гравців',
        statId: 1501
    },
    {
        id: RankId.TotalHonorableKills,
        icon: 'warrior_skullbanner',
        name: 'Душогуб',
        desc: 'Найбільша кількість почесних вбивств',
        statId: 588
    },
    {
        id: RankId.DuelsWon,
        icon: 'ability_warrior_battleshout',
        name: 'Забіяка',
        desc: 'Найбільша кількість перемог в дуелях',
        statId: 319
    },
    {
        id: RankId.BattlegroundsWon,
        icon: 'achievement_bg_killxenemies_generalsroom',
        name: 'Бунтар',
        desc: 'Найбільша кількість перемог на полях битв',
        statId: 840
    },
    {
        id: RankId.ArenasWon,
        icon: 'ability_mage_fierypayback',
        name: 'Заколотник',
        desc: 'Найбільша кількість перемог на аренах',
        statId: 837
    },
    {
        id: RankId.Highest2v2PersonalRating,
        icon: 'achievement_arena_2v2_7',
        name: 'Гладіатор 2v2',
        desc: 'Найбільший персональний досягнутий рейтинг 2v2',
        statId: 370
    },
    {
        id: RankId.Highest3v3PersonalRating,
        icon: 'achievement_arena_3v3_7',
        name: 'Гладіатор 3v3',
        desc: 'Найбільший персональний досягнутий рейтинг 3v3',
        statId: 595
    }
]

export function ranks() {
    return knownRanks
}
