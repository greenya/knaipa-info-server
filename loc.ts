export interface MasFemMul {
    mas: string,
    fem: string,
    mul: string
}

export interface ItThey {
    it: string,
    they: string
}

export interface It {
    it: string
}

const knownRaces: { [_:number]: MasFemMul } = {
    1: { mas: 'людина', fem: 'людина', mul: 'люди' },
    3: { mas: 'дворф', fem: 'дворфа', mul: 'дворфи' },
    4: { mas: 'нічний ельф', fem: 'нічна ельфа', mul: 'нічні ельфи' },
    7: { mas: 'гном', fem: 'гномка', mul: 'гноми' },
    11: { mas: 'дреней', fem: 'дренейка', mul: 'дренеї' },
    22: { mas: 'ворген', fem: 'воргенка', mul: 'воргени' },
    25: { mas: 'пандарен', fem: 'пандаренка', mul: 'пандарени' },
    29: { mas: 'ельф пустоти', fem: 'ельфа пустоти', mul: 'ельфи пустоти' },
    30: { mas: 'світлокутий дреней', fem: 'світлокута дренейка', mul: 'світлокуті дренеї' },
    32: { mas: 'кул-тірасець', fem: 'кул-тіраска', mul: 'кул-тірасці' },
    34: { mas: 'темнозалізний дворф', fem: 'темнозалізна дворфа', mul: 'темнозалізні дворфи' },
    37: { mas: 'мехагном', fem: 'мехагномка', mul: 'мехагноми' },
    52: { mas: 'драктир', fem: 'драктирка', mul: 'драктири' }
}

export function race(id: number) {
    return knownRaces[id]
}

const knownClasses: { [_:number]: MasFemMul } = {
    1: { mas: 'воїн', fem: 'воїтелька', mul: 'воїни' },
    2: { mas: 'паладин', fem: 'паладинка', mul: 'паладини' },
    3: { mas: 'мисливець', fem: 'мисливиця', mul: 'мисливці' },
    4: { mas: 'розбійник', fem: 'розбійниця', mul: 'розбійники' },
    5: { mas: 'жрець', fem: 'жриця', mul: 'жерці' },
    6: { mas: 'лицар смерті', fem: 'лицарка смерті', mul: 'лицарі смерті' },
    7: { mas: 'шаман', fem: 'шаманка', mul: 'шамани' },
    8: { mas: 'маг', fem: 'магеса', mul: 'маги' },
    9: { mas: 'чорнокнижник', fem: 'чорнокнижниця', mul: 'чорнокнижники' },
    10: { mas: 'монах', fem: 'монахиня', mul: 'монахи' },
    11: { mas: 'друїд', fem: 'друїдка', mul: 'друїди' },
    12: { mas: 'мисливець на демонів', fem: 'мисливиця на демонів', mul: 'мисливці на демонів' },
    13: { mas: 'пробудник', fem: 'пробудниця', mul: 'пробудники' }
}

export function clazz(id: number) {
    return knownClasses[id]
}

const knownProfessions: { [_:number]: ItThey } = {
    164: { it: 'ковальство', they: 'ковалі' },
    165: { it: 'шкірництво', they: 'шкірники' },
    171: { it: 'алхімія', they: 'алхіміки' },
    182: { it: 'травництво', they: 'травники' },
    185: { it: 'куховарство', they: 'куховари' },
    186: { it: 'гірництво', they: 'гірники' },
    197: { it: 'кравецтво', they: 'кравці' },
    202: { it: 'інженерія', they: 'інженери' },
    333: { it: 'зачаровування', they: 'зачаровувачі' },
    356: { it: 'рибальство', they: 'рибалки' },
    393: { it: 'шкуродерство', they: 'шкуродери' },
    755: { it: 'ювелірне мистецтво', they: 'ювеліри' },
    773: { it: 'писання', they: 'писарі' },
    794: { it: 'археологія', they: 'археологи' }
    // 2777: { it: 'Soul Cyphering', they: 'soul cypherers' }
    // 2787: { it: 'Abominable Stitchin', they: 'abominable stitchers' }
    // 2791: { it: 'Ascension Crafting', they: 'ascension crafters' }
    // 2811: { it: 'Stygia Crafting', they: 'stygia crafters' }
    // 2821: { it: 'Arcana Manipulation' }
    // 2847: { it: 'Tuskarr Fishing Gear' }
}

export function profession(id: number) {
    return knownProfessions[id]
}

const knownProfessionTiers: { [_:number]: It } = {
    2437: { it: 'ковальство Кул-Тірасу' }, // omit Zandalari
    2454: { it: 'ковальство Легіону' },
    2472: { it: 'ковальство Дренору' },
    2473: { it: 'ковальство Пандарії' },
    2474: { it: 'ковальство Катаклізму' },
    2475: { it: 'ковальство Нортренду' },
    2476: { it: 'ковальство Позамежжя' },
    2477: { it: 'ковальство' },
    2751: { it: 'ковальство Тінеземель' },
    2822: { it: 'ковальство Драконових островів' },

    2525: { it: 'шкірництво Кул-Тірасу' }, // omit Zandalari
    2526: { it: 'шкірництво Легіону' },
    2527: { it: 'шкірництво Дренору' },
    2528: { it: 'шкірництво Пандарії' },
    2529: { it: 'шкірництво Катаклізму' },
    2530: { it: 'шкірництво Нортренду' },
    2531: { it: 'шкірництво Позамежжя' },
    2532: { it: 'шкірництво' },
    2758: { it: 'шкірництво Тінеземель' },
    2830: { it: 'шкірництво Драконових островів' },

    2478: { it: 'алхімія Кул-Тірасу' }, // omit Zandalari
    2479: { it: 'алхімія Легіону' },
    2480: { it: 'алхімія Дренору' },
    2481: { it: 'алхімія Пандарії' },
    2482: { it: 'алхімія Катаклізму' },
    2483: { it: 'алхімія Нортренду' },
    2484: { it: 'алхімія Позамежжя' },
    2485: { it: 'алхімія' },
    2750: { it: 'алхімія Тінеземель' },
    2823: { it: 'алхімія Драконових островів' },

    2549: { it: 'травництво Кул-Тірасу' }, // omit Zandalari
    2550: { it: 'травництво Легіону' },
    2551: { it: 'травництво Дренору' },
    2552: { it: 'травництво Пандарії' },
    2553: { it: 'травництво Катаклізму' },
    2554: { it: 'травництво Нортренду' },
    2555: { it: 'травництво Позамежжя' },
    2556: { it: 'травництво' },
    2760: { it: 'травництво Тінеземель' },
    2832: { it: 'травництво Драконових островів' },

    2541: { it: 'куховарство Кул-Тірасу' }, // omit Zandalari
    2542: { it: 'куховарство Легіону' },
    2543: { it: 'куховарство Дренору' },
    2544: { it: 'куховарство Пандарії' },
    2545: { it: 'куховарство Катаклізму' },
    2546: { it: 'куховарство Нортренду' },
    2547: { it: 'куховарство Позамежжя' },
    2548: { it: 'куховарство' },
    2752: { it: 'куховарство Тінеземель' },
    2824: { it: 'куховарство Драконових островів' },

    2565: { it: 'гірництво Кул-Тірасу' }, // omit Zandalari
    2566: { it: 'гірництво Легіону' },
    2567: { it: 'гірництво Дренору' },
    2568: { it: 'гірництво Пандарії' },
    2569: { it: 'гірництво Катаклізму' },
    2570: { it: 'гірництво Нортренду' },
    2571: { it: 'гірництво Позамежжя' },
    2572: { it: 'гірництво' },
    2761: { it: 'гірництво Тінеземель' },
    2833: { it: 'гірництво Драконових островів' },

    2533: { it: 'кравецтво Кул-Тірасу' }, // omit Zandalari
    2534: { it: 'кравецтво Легіону' },
    2535: { it: 'кравецтво Дренору' },
    2536: { it: 'кравецтво Пандарії' },
    2537: { it: 'кравецтво Катаклізму' },
    2538: { it: 'кравецтво Нортренду' },
    2539: { it: 'кравецтво Позамежжя' },
    2540: { it: 'кравецтво' },
    2759: { it: 'кравецтво Тінеземель' },
    2831: { it: 'кравецтво Драконових островів' },

    2499: { it: 'інженерія Кул-Тірасу' }, // omit Zandalari
    2500: { it: 'інженерія Легіону' },
    2501: { it: 'інженерія Дренору' },
    2502: { it: 'інженерія Пандарії' },
    2503: { it: 'інженерія Катаклізму' },
    2504: { it: 'інженерія Нортренду' },
    2505: { it: 'інженерія Позамежжя' },
    2506: { it: 'інженерія' },
    2755: { it: 'інженерія Тінеземель' },
    2827: { it: 'інженерія Драконових островів' },

    2486: { it: 'зачаровування Кул-Тірасу' }, // omit Zandalari
    2487: { it: 'зачаровування Легіону' },
    2488: { it: 'зачаровування Дренору' },
    2489: { it: 'зачаровування Пандарії' },
    2491: { it: 'зачаровування Катаклізму' },
    2492: { it: 'зачаровування Нортренду' },
    2493: { it: 'зачаровування Позамежжя' },
    2494: { it: 'зачаровування' },
    2753: { it: 'зачаровування Тінеземель' },
    2825: { it: 'зачаровування Драконових островів' },

    2585: { it: 'рибальство Кул-Тірасу' }, // omit Zandalari
    2586: { it: 'рибальство Легіону' },
    2587: { it: 'рибальство Дренору' },
    2588: { it: 'рибальство Пандарії' },
    2589: { it: 'рибальство Катаклізму' },
    2590: { it: 'рибальство Нортренду' },
    2591: { it: 'рибальство Позамежжя' },
    2592: { it: 'рибальство' },
    2754: { it: 'рибальство Тінеземель' },
    2826: { it: 'рибальство Драконових островів' },

    2557: { it: 'шкуродерство Кул-Тірасу' }, // omit Zandalari
    2558: { it: 'шкуродерство Легіону' },
    2559: { it: 'шкуродерство Дренору' },
    2560: { it: 'шкуродерство Пандарії' },
    2561: { it: 'шкуродерство Катаклізму' },
    2562: { it: 'шкуродерство Нортренду' },
    2563: { it: 'шкуродерство Позамежжя' },
    2564: { it: 'шкуродерство' },
    2762: { it: 'шкуродерство Тінеземель' },
    2834: { it: 'шкуродерство Драконових островів' },

    2517: { it: 'ювелірне мистецтво Кул-Тірасу' }, // omit Zandalari
    2518: { it: 'ювелірне мистецтво Легіону' },
    2519: { it: 'ювелірне мистецтво Дренору' },
    2520: { it: 'ювелірне мистецтво Пандарії' },
    2521: { it: 'ювелірне мистецтво Катаклізму' },
    2522: { it: 'ювелірне мистецтво Нортренду' },
    2523: { it: 'ювелірне мистецтво Позамежжя' },
    2524: { it: 'ювелірне мистецтво' },
    2757: { it: 'ювелірне мистецтво Тінеземель' },
    2829: { it: 'ювелірне мистецтво Драконових островів' },

    2507: { it: 'писання Кул-Тірасу' }, // omit Zandalari
    2508: { it: 'писання Легіону' },
    2509: { it: 'писання Дренору' },
    2510: { it: 'писання Пандарії' },
    2511: { it: 'писання Катаклізму' },
    2512: { it: 'писання Нортренду' },
    2513: { it: 'писання Позамежжя' },
    2514: { it: 'писання' },
    2756: { it: 'писання Тінеземель' },
    2828: { it: 'писання Драконових островів' },
}

export function professionTier(id: number) {
    return knownProfessionTiers[id]
}

// TODO: add localization for following texts into knownTexts

// Quest Schematics
// Profession Equipment
// Finishing Reagents
// Recrafting
// Quest Techniques
// Bait Recipes
// Fishing Lure Recipes
// Refinement
// Skinning Details
// Consumable Tools
// Profession Tools and Accessories
// Finishing Reagents
// Stonework
// Dragonriding
// Quest Plans
// Recrafting
// Quest Formulas
// Recrafting
// Profession Tool Enchantments
// Rods and Wands
// Magical Merchandise
// Illusory Goods
// Finishing Reagents
// Quest Techniques
// Refinement
// Section I - Hochenblume
// Section III - Saxifrage
// Section IV - Writhebark
// Section II - Bubble Poppy
// Appendix II - Overload
// Appendix I - Boundless Knowledge
// Quest Techniques
// Refinement
// Section II - Draconium
// Section I - Serevite
// Appendix II - Overload
// Appendix I - Boundless Knowledge
// Section III - Khaz'gorite
// Hats & Accessories
// Chronocloth Garments
// Azureweave Garments
// Garments
// Embroidered Bags
// Assorted Embroidery
// Finishing Reagents
// Profession Garments
// Woven Cloth
// Tailoring Essentials
// Experiments
// Quest Patterns
// Milling // x9
// Runes and Sigils
// Quest Techniques
// Inscription Essentials
// Dragonriding - Windborne Velocidrake
// Dragonriding - Renewed Proto-Drake
// Dragonriding - Highland Drake
// Dragonriding - Cliffside Wylderdrake
// Profession Equipment
// Profession Specialization
// Missives
// Mysteries
// Crafting Tool Missives
// Gathering Tool Missives
// Ingredients
// Beverages
// Meat Meals
// Simple Fish Dishes
// Deluxe Fish Dishes
// Great Feasts
// Freshwater
// Saltwater
// General Fishing
// Specialty Fishing
// Profession Equipment
// Decayed Patterns
// Bestial Patterns
// Elemental Patterns
// Finishing Reagents
// Quest Patterns
// Recrafting
// Air Phials
// Frost Phials
// Frost Potions
// Elemental Phials and Potions
// Air Potions
// Alchemist Stones
// Transmutations
// Incense
// Finishing Reagents
// Alchemy Essentials
// Quest Recipes
// Prospecting // x8
// Rudimentary Gems
// Air Gems
// Earth Gems
// Frost Gems
// Fire Gems
// Primalist Gems
// Miscellaneous
// Statues & Carvings
// Battle Pets
// Novelties
// Profession Equipment
// Extravagant Glasswares
// Jewelcrafting Essentials
// Quest Designs

const knownTexts: { [_:string]: It } = {
    'Anti-Venoms':              { it: 'протиотрути' },
    'Armor':                    { it: 'броня' },
    'Armor Enchantments':       { it: 'зачаровування броні' },
    'Armor Enhancers':          { it: 'підсилювачі броні' },
    'Armor Kits':               { it: 'набори для броні' },
    'Armor Mods':               { it: 'модифікатори броні' },
    'Bags':                     { it: 'сумки' },
    'Bandages':                 { it: 'бинти' },
    'Battle Flags':             { it: 'бойові прапори' },
    'Battle Standards':         { it: 'бойові знамена' },
    'Belt Attachments':         { it: 'прикріплення на пояс' },
    'Belts':                    { it: 'пояси' },
    'Blood Contracts':          { it: 'криваві контракти' },
    'Blue Gems':                { it: 'сині самоцвіти' },
    'Bombs':                    { it: 'бомби' },
    'Books & Scrolls':          { it: 'книги та свитки' },
    'Boot Enchantments':        { it: 'зачаровування взуття' },
    'Boots':                    { it: 'взуття' },
    'Bracer Enchantments':      { it: 'зачаровування наручів' },
    'Bracers':                  { it: 'наручі' },
    'Card':                     { it: 'картка' },
    'Cards':                    { it: 'картки' },
    'Cauldrons':                { it: 'казани' },
    'Chest':                    { it: 'нагрудник' },
    'Chest Enchantments':       { it: 'зачаровування нагрудників' },
    'Chests':                   { it: 'нагрудники' },
    'Clear Mind':               { it: 'ясний розум' },
    'Cloak':                    { it: 'накидка' },
    'Cloak Enchantments':       { it: 'зачаровування накидок' },
    'Cloaks':                   { it: 'накидки' },
    'Cloth Armor':              { it: 'полотняна броня' },
    'Cloth Goggles':            { it: 'полотняні окуляри' },
    'Cogwheels':                { it: 'зубчасті колеса' },
    'Combat Potions':           { it: 'бойові зілля' },
    'Combat Tools':             { it: 'бойові інструменти' },
    'Contracts':                { it: 'контракти' },
    'Conversions':              { it: 'перетворення' },
    'Crowns':                   { it: 'корони' },
    'Cures & Tonics':           { it: 'ліки та тоніки' },
    'Cures of Draenor':         { it: 'ліки Дренору' },
    'Cures of the Broken Isles': { it: 'ліки Розколотих островів' },
    'Delicacies':               { it: 'делікатеси' },
    'Delightful Drinks':        { it: 'освіжаючі напої' },
    'Desserts':                 { it: 'десерти' },
    'Devices':                  { it: 'пристрої' },
    'Disenchant':               { it: 'розпилення' },
    'Disenchants':              { it: 'розпилення' },
    'Drums':                    { it: 'барабани' },
    'Dyes and Thread':          { it: 'барвники та нитки' },
    'Elemental':                { it: 'стихії' },
    'Elixirs':                  { it: 'еліксири' },
    'Embossments':              { it: 'карбування' },
    'Embroidery':               { it: 'вишивання' },
    'Equipment Mods':           { it: 'модифікатори обладнання' },
    'Everyday Cooking':         { it: 'щоденне куховарство' },
    'Explosives':               { it: 'вибухівка' },
    'Feasts':                   { it: 'банкети' },
    'Fireworks':                { it: 'феєрверки' },
    'Fish Dishes':              { it: 'рибні страви' },
    'Fist Weapons':             { it: 'кулакова зброя' },
    'Flasks':                   { it: 'фляги' },
    'Focus':                    { it: 'фокусування' },
    'Follower Equipment':       { it: 'обладнання попутників' },
    'Food of Draenor':          { it: 'їжа Дренору' },
    'Gathering Techniques':     { it: 'техніки збору' },
    'Gauntlets':                { it: 'рукавиці' },
    'Gems':                     { it: 'самоцвіти' },
    'Glove Enchantments':       { it: 'зачаровування рукавиць' },
    'Gloves':                   { it: 'рукавиці' },
    'Glyphs':                   { it: 'гліфи' },
    'Goggles':                  { it: 'окуляри' },
    'Green Gems':               { it: 'зелені самоцвіти' },
    'Guns':                     { it: 'гармати' },
    'Guns & Bows':              { it: 'гармати та луки' },
    'Hats':                     { it: 'капелюхи' },
    'Hats & Hoods':             { it: 'капелюхи та капюшони' },
    'Helms':                    { it: 'шоломи' },
    'Holiday Cooking':          { it: 'святкове куховарство' },
    'Illusions':                { it: 'ілюзії' },
    'Ink':                      { it: 'чорнило' },
    'Inks':                     { it: 'чорнила' },
    'Item Enhancers':           { it: 'підсилювачі' },
    'Jewelry':                  { it: 'ювелірні прикраси' },
    'Jewelry Enhancers':        { it: 'підсилювачі ювелірних прикрас' },
    'Large Meals':              { it: 'великі страви' },
    'Leather Armor':            { it: 'шкіряна броня' },
    'Leather Goggles':          { it: 'шкіряні окуляри' },
    'Legs':                     { it: 'ноги' },
    'Light Meals':              { it: 'легкі страви' },
    'Lures':                    { it: 'приманки' },
    'Mail Armor':               { it: 'кольчужна броня' },
    'Mail Goggles':             { it: 'кольчужні окуляри' },
    'Mass Milling':             { it: 'масовий помел' },
    'Mass Prospecting':         { it: 'масове просіювання' },
    'Materials':                { it: 'матеріали' },
    'Meat Dishes':              { it: 'м\'ясні страви' },
    'Meta Gems':                { it: 'мета-самоцвіти' },
    'Mining Techniques':        { it: 'техніки гірництва' },
    'Mount Equipment':          { it: 'обладнання засобів пересування' },
    'Mounts':                   { it: 'засоби пересування' },
    'Mounts & Pets':            { it: 'засоби пересування та домашні тварини' },
    'Mounts Equipment':         { it: 'обладнання засобів пересування' },
    'Neck':                     { it: 'шия' },
    'Neck Enchantments':        { it: 'зачаровування шиї' },
    'Necklaces':                { it: 'намиста' },
    'Nets':                     { it: 'сітки' },
    'Off-Hands':                { it: 'предмети для лівої руки' },
    'Off-hand':                 { it: 'предмет для лівої руки' },
    'Oils':                     { it: 'мастила' },
    'Oils and Extracts':        { it: 'мастила та екстракти' },
    'Optional Reagents':        { it: 'необов\'язкові реагенти' },
    'Orange Gems':              { it: 'помаранчеві самоцвіти' },
    'Other':                    { it: 'інше' },
    'Pants':                    { it: 'штани' },
    'Parts':                    { it: 'частини' },
    'Pets':                     { it: 'домашні тварини' },
    'Pets and Projects':        { it: 'домашні тварини та проєкти' },
    'Plate Goggles':            { it: 'латні окуляри' },
    'Potions':                  { it: 'зілля' },
    'Potions and Elixirs':      { it: 'зілля та еліксири' },
    'Prismatic Gems':           { it: 'призматичні самоцвіти' },
    'Prisms & Statues':         { it: 'призми та статуї' },
    'Purple Gems':              { it: 'фіолетові самоцвіти' },
    'Quest':                    { it: 'завдання' },
    'Reagents':                 { it: 'реагенти' },
    'Reagents and Research':    { it: 'реагенти та дослідження' },
    'Red Gems':                 { it: 'червоні самоцвіти' },
    'Relics':                   { it: 'реліквії' },
    'Research':                 { it: 'дослідження' },
    'Ring':                     { it: 'каблучка' },
    'Ring Enchantments':        { it: 'зачаровування каблучок' },
    'Rings':                    { it: 'каблучки' },
    'Robes & Tunics':           { it: 'халати та туніки' },
    'Robotics':                 { it: 'робототехніка' },
    'Rods':                     { it: 'стрижні' },
    'Scopes':                   { it: 'приціли' },
    'Scopes & Ammo':            { it: 'приціли та набої' },
    'Scrolls':                  { it: 'свитки' },
    'Scrolls & Research':       { it: 'свитки та дослідження' },
    'Shatters':                 { it: 'подрібнення' },
    'Shield Enchantments':      { it: 'зачаровування щитів' },
    'Shield and Off-Hand Enchantments': { it: 'зачаровування щитів та предметів для лівої руки' },
    'Shields':                  { it: 'щити' },
    'Shirts':                   { it: 'сорочки' },
    'Shoulder Enchantments':    { it: 'зачаровування наплічників' },
    'Shoulder Inscription':     { it: 'розпис наплічника' },
    'Shoulders':                { it: 'наплічники' },
    'Skeleton Keys':            { it: 'скелетні ключі' },
    'Skinning Techniques':      { it: 'техніки шкуродерства' },
    'Smelting':                 { it: 'виплавка' },
    'Snacks':                   { it: 'закуски' },
    'Soul Food':                { it: 'їжа для душі' },
    'Special':                  { it: 'спеціальне' },
    'Specialized Armor':        { it: 'спеціалізована броня' },
    'Specialized Jewelry':      { it: 'спеціалізовані ювелірні прикраси' },
    'Spellthread':              { it: 'чаронитка' },
    'Spellthreads':             { it: 'чаронитки' },
    'Statues':                  { it: 'статуї' },
    'Staves':                   { it: 'палиці' },
    'Staves & Off-Hands':       { it: 'палиці та предмети для лівої руки' },
    'Staves & Wands':           { it: 'палиці та магічні палички' },
    'Tinkers':                  { it: 'механізми' },
    'Tool of the Trade':        { it: 'професійні інструменти' },
    'Tools':                    { it: 'інструменти' },
    'Toys':                     { it: 'іграшки' },
    'Toys & Pets':              { it: 'іграшки та домашні тварини' },
    'Toys & Prisms':            { it: 'іграшки та призми' },
    'Toys, Pets, and Mounts':   { it: 'іграшки, домашні тварини та засоби пересування' },
    'Training':                 { it: 'тренування' },
    'Transmutation':            { it: 'трансмутація' },
    'Trinket':                  { it: 'дрібничка' },
    'Trinkets':                 { it: 'дрібнички' },
    'Trinkets and Trinket Upgrades': { it: 'дрібнички та вдосконалення дрібничок' },
    'Unusual Delights':         { it: 'незвичайні насолоди' },
    'Utility Potions':          { it: 'допоміжні зілля' },
    'Vantus Runes':             { it: 'вантійські руни' },
    'Wands':                    { it: 'магічні палички' },
    'Weapon':                   { it: 'зброя' },
    'Weapon Enchantments':      { it: 'зачаровування зброї' },
    'Weapon Mods':              { it: 'модифікатори зброї' },
    'Weapons':                  { it: 'зброя' },
    'Weapons & Off-Hands':      { it: 'зброя та предмети для лівої руки' },
    'Weapons Mods':             { it: 'модифікатори зброї' },
    'Weapons and Shields':      { it: 'зброя та щити' },
    'Wrist Enchantments':       { it: 'зачаровування зап\'ястя' },
    'Yellow Gems':              { it: 'жовті самоцвіти' }
}

export function text(key: string) {
    return knownTexts[key]
}
