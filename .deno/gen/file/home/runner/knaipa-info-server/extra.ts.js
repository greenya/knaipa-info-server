const knownShadowlandsLegendaryRecipes = [
    {
        group: 'для всіх',
        items: [
            { slot: 'намисто', name: 'Shadowghast Necklace', ranks: [44871, 45241, 45243, 45590] },
            { slot: 'каблучка', name: 'Shadowghast Ring', ranks: [44870, 45240, 45242, 45591] },
            { slot: 'накидка', name: 'Grim-Veiled Cape', ranks: [42863, 45246, 45255, 45608] },
        ]
    },
    {
        group: 'полотно',
        items: [
            { slot: 'шолом', name: 'Grim-Veiled Hood', ranks: [42861, 45248, 45257, 45612] },
            { slot: 'наплічники', name: 'Grim-Veiled Spaulders', ranks: [42859, 45250, 45259, 45614] },
            { slot: 'нагрудник', name: 'Grim-Veiled Robe', ranks: [42864, 45245, 45254, 45609] },
            { slot: 'зап\'ястя', name: 'Grim-Veiled Bracers', ranks: [42857, 45252, 45261, 45616] },
            { slot: 'рукавиці', name: 'Grim-Veiled Mittens', ranks: [42862, 45247, 45256, 45611] },
            { slot: 'пояс', name: 'Grim-Veiled Belt', ranks: [42858, 45251, 45260, 45615] },
            { slot: 'штани', name: 'Grim-Veiled Pants', ranks: [42860, 45249, 45258, 45613] },
            { slot: 'взуття', name: 'Grim-Veiled Sandals', ranks: [42856, 45244, 45253, 45610] },
        ]
    },
    {
        group: 'шкіра',
        items: [
            { slot: 'шолом', name: 'Umbrahide Helm', ranks: [42505, 45211, 45227, 45595] },
            { slot: 'наплічники', name: 'Umbrahide Pauldrons', ranks: [42507, 45213, 45229, 45597] },
            { slot: 'нагрудник', name: 'Umbrahide Vest', ranks: [42503, 45209, 45225, 45592] },
            { slot: 'зап\'ястя', name: 'Umbrahide Armguards', ranks: [42509, 45215, 45231, 45599] },
            { slot: 'рукавиці', name: 'Umbrahide Gauntlets', ranks: [42504, 45210, 45226, 45594] },
            { slot: 'пояс', name: 'Umbrahide Waistguard', ranks: [42508, 45214, 45230, 45598] },
            { slot: 'штани', name: 'Umbrahide Leggings', ranks: [42506, 45212, 45228, 45596] },
            { slot: 'взуття', name: 'Umbrahide Treads', ranks: [42502, 45208, 45224, 45593] },
        ]
    },
    {
        group: 'кольчуга',
        items: [
            { slot: 'шолом', name: 'Boneshatter Helm', ranks: [42513, 45219, 45235, 45603] },
            { slot: 'наплічники', name: 'Boneshatter Pauldrons', ranks: [42515, 45221, 45237, 45605] },
            { slot: 'нагрудник', name: 'Boneshatter Vest', ranks: [42511, 45217, 45233, 45600] },
            { slot: 'зап\'ястя', name: 'Boneshatter Armguards', ranks: [42517, 45223, 45239, 45607] },
            { slot: 'рукавиці', name: 'Boneshatter Gauntlets', ranks: [42512, 45218, 45234, 45602] },
            { slot: 'пояс', name: 'Boneshatter Waistguard', ranks: [42516, 45222, 45238, 45606] },
            { slot: 'штани', name: 'Boneshatter Greaves', ranks: [42514, 45220, 45236, 45604] },
            { slot: 'взуття', name: 'Boneshatter Treads', ranks: [42510, 45216, 45232, 45601] },
        ]
    },
    {
        group: 'лати',
        items: [
            { slot: 'шолом', name: 'Shadowghast Helm', ranks: [42384, 45196, 45204, 45585] },
            { slot: 'наплічники', name: 'Shadowghast Pauldrons', ranks: [42386, 45194, 45202, 45587] },
            { slot: 'нагрудник', name: 'Shadowghast Breastplate', ranks: [42381, 45199, 45207, 45582] },
            { slot: 'зап\'ястя', name: 'Shadowghast Armguards', ranks: [42388, 45192, 45200, 45589] },
            { slot: 'рукавиці', name: 'Shadowghast Gauntlets', ranks: [42383, 45197, 45205, 45584] },
            { slot: 'пояс', name: 'Shadowghast Waistguard', ranks: [42387, 45193, 45201, 45588] },
            { slot: 'штани', name: 'Shadowghast Greaves', ranks: [42385, 45195, 45203, 45586] },
            { slot: 'взуття', name: 'Shadowghast Sabatons', ranks: [42382, 45198, 45206, 45583] },
        ]
    },
];
export function shadowlandsLegendaryRecipes() {
    return knownShadowlandsLegendaryRecipes;
}
export var RankId;
(function (RankId) {
    RankId[RankId["AchievementPoints"] = 7001] = "AchievementPoints";
    RankId[RankId["ItemLevel"] = 7002] = "ItemLevel";
    RankId[RankId["RecipesKnown"] = 7003] = "RecipesKnown";
    RankId[RankId["CookingRecipesKnown"] = 7004] = "CookingRecipesKnown";
    RankId[RankId["QuestsCompleted"] = 7005] = "QuestsCompleted";
    RankId[RankId["DailyQuestsCompleted"] = 7006] = "DailyQuestsCompleted";
    RankId[RankId["FlightPathsTaken"] = 7007] = "FlightPathsTaken";
    RankId[RankId["FishCaught"] = 7008] = "FishCaught";
    RankId[RankId["SummonsAccepted"] = 7009] = "SummonsAccepted";
    RankId[RankId["NumberOfTimesHearthed"] = 7010] = "NumberOfTimesHearthed";
    RankId[RankId["PetBattlesWonAtMaxLevel"] = 7011] = "PetBattlesWonAtMaxLevel";
    RankId[RankId["TotalKills"] = 7012] = "TotalKills";
    RankId[RankId["TotalDeaths"] = 7013] = "TotalDeaths";
    RankId[RankId["DeathsFromFalling"] = 7014] = "DeathsFromFalling";
    RankId[RankId["DeathsFromDrowning"] = 7015] = "DeathsFromDrowning";
    RankId[RankId["DeathsFromFireAndLava"] = 7016] = "DeathsFromFireAndLava";
    RankId[RankId["TotalDeathsFromOtherPlayers"] = 7017] = "TotalDeathsFromOtherPlayers";
    RankId[RankId["TotalHonorableKills"] = 7018] = "TotalHonorableKills";
    RankId[RankId["DuelsWon"] = 7019] = "DuelsWon";
    RankId[RankId["BattlegroundsWon"] = 7020] = "BattlegroundsWon";
    RankId[RankId["ArenasWon"] = 7021] = "ArenasWon";
    RankId[RankId["Highest2v2PersonalRating"] = 7022] = "Highest2v2PersonalRating";
    RankId[RankId["Highest3v3PersonalRating"] = 7023] = "Highest3v3PersonalRating";
})(RankId || (RankId = {}));
const knownRanks = [
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
];
export function ranks() {
    return knownRanks;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXh0cmEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJleHRyYS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxNQUFNLGdDQUFnQyxHQUFHO0lBQ3JDO1FBQ0ksS0FBSyxFQUFFLFVBQVU7UUFDakIsS0FBSyxFQUFFO1lBQ0gsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFPLElBQUksRUFBRSxzQkFBc0IsRUFBSSxLQUFLLEVBQUUsQ0FBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUUsRUFBRTtZQUMvRixFQUFFLElBQUksRUFBRSxVQUFVLEVBQU0sSUFBSSxFQUFFLGtCQUFrQixFQUFRLEtBQUssRUFBRSxDQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBRSxFQUFFO1lBQy9GLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBTyxJQUFJLEVBQUUsa0JBQWtCLEVBQVEsS0FBSyxFQUFFLENBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFFLEVBQUU7U0FDbEc7S0FDSjtJQUNEO1FBQ0ksS0FBSyxFQUFFLFNBQVM7UUFDaEIsS0FBSyxFQUFFO1lBQ0gsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFTLElBQUksRUFBRSxrQkFBa0IsRUFBUSxLQUFLLEVBQUUsQ0FBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUUsRUFBRTtZQUMvRixFQUFFLElBQUksRUFBRSxZQUFZLEVBQUksSUFBSSxFQUFFLHVCQUF1QixFQUFHLEtBQUssRUFBRSxDQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBRSxFQUFFO1lBQy9GLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBSyxJQUFJLEVBQUUsa0JBQWtCLEVBQVEsS0FBSyxFQUFFLENBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFFLEVBQUU7WUFDL0YsRUFBRSxJQUFJ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