import { get } from './core.ts';
export async function achievementCategories() {
    return await get('data/wow/achievement-category/index', { namespace: 'static' });
}
export async function achievementCategory(id) {
    return await get(`data/wow/achievement-category/${id}`, { namespace: 'static' });
}
export async function achievements() {
    const { achievements } = await get('data/wow/achievement/index', { namespace: 'static' });
    return achievements;
}
export async function achievement(id) {
    return await get(`data/wow/achievement/${id}`, { namespace: 'static' });
}
export async function achievementMedia(id) {
    return await get(`data/wow/media/achievement/${id}`, { namespace: 'static' });
}
export async function auctions(connectedRealmId) {
    const { auctions } = await get(`data/wow/connected-realm/${connectedRealmId}/auctions`, { namespace: 'dynamic' });
    return auctions;
}
export async function characterAchievements(realmSlug, characterName) {
    return await get(`profile/wow/character/${realmSlug}/${characterName.toLowerCase()}/achievements`, { namespace: 'profile' });
}
export async function characterAchievementStatistics(realmSlug, characterName) {
    const { categories } = await get(`profile/wow/character/${realmSlug}/${characterName.toLowerCase()}/achievements/statistics`, { namespace: 'profile' });
    return categories;
}
export async function characterAppearance(realmSlug, characterName) {
    return await get(`profile/wow/character/${realmSlug}/${characterName.toLowerCase()}/appearance`, { namespace: 'profile' });
}
export async function characterMounts(realmSlug, characterName) {
    const { mounts } = await get(`profile/wow/character/${realmSlug}/${characterName.toLowerCase()}/collections/mounts`, { namespace: 'profile' });
    return mounts;
}
export async function characterPets(realmSlug, characterName) {
    const { pets } = await get(`profile/wow/character/${realmSlug}/${characterName.toLowerCase()}/collections/pets`, { namespace: 'profile' });
    return pets;
}
export async function characterDungeons(realmSlug, characterName) {
    const { expansions } = await get(`profile/wow/character/${realmSlug}/${characterName.toLowerCase()}/encounters/dungeons`, { namespace: 'profile' });
    return expansions;
}
export async function characterRaids(realmSlug, characterName) {
    const { expansions } = await get(`profile/wow/character/${realmSlug}/${characterName.toLowerCase()}/encounters/raids`, { namespace: 'profile' });
    return expansions;
}
export async function characterEquipment(realmSlug, characterName) {
    const { equipped_items } = await get(`profile/wow/character/${realmSlug}/${characterName.toLowerCase()}/equipment`, { namespace: 'profile' });
    return equipped_items;
}
export async function characterHunterPets(realmSlug, characterName) {
    const { hunter_pets } = await get(`profile/wow/character/${realmSlug}/${characterName.toLowerCase()}/hunter-pets`, { namespace: 'profile' });
    return hunter_pets;
}
export async function characterMediaAssets(realmSlug, characterName) {
    const { assets } = await get(`profile/wow/character/${realmSlug}/${characterName.toLowerCase()}/character-media`, { namespace: 'profile' });
    return assets;
}
export async function characterMythicKeystoneProfile(realmSlug, characterName) {
    return await get(`profile/wow/character/${realmSlug}/${characterName.toLowerCase()}/mythic-keystone-profile`, { namespace: 'profile' });
}
export async function characterMythicKeystoneSeasonBestRuns(realmSlug, characterName, season) {
    const { best_runs } = await get(`profile/wow/character/${realmSlug}/${characterName.toLowerCase()}/mythic-keystone-profile/season/${season}`, { namespace: 'profile' });
    return best_runs;
}
export async function characterProfessions(realmSlug, characterName) {
    return await get(`profile/wow/character/${realmSlug}/${characterName.toLowerCase()}/professions`, { namespace: 'profile' });
}
export async function characterProfile(realmSlug, characterName) {
    return await get(`profile/wow/character/${realmSlug}/${characterName.toLowerCase()}`, { namespace: 'profile' });
}
export async function characterProfileStatus(realmSlug, characterName) {
    return await get(`profile/wow/character/${realmSlug}/${characterName.toLowerCase()}/status`, { namespace: 'profile' });
}
export async function characterPvpSummary(realmSlug, characterName) {
    return await get(`profile/wow/character/${realmSlug}/${characterName.toLowerCase()}/pvp-summary`, { namespace: 'profile' });
}
export async function characterPvpBracket(realmSlug, characterName, bracket) {
    return await get(`profile/wow/character/${realmSlug}/${characterName.toLowerCase()}/pvp-bracket/${bracket}`, { namespace: 'profile' });
}
export async function characterQuestsInProgress(realmSlug, characterName) {
    const { in_progress } = await get(`profile/wow/character/${realmSlug}/${characterName.toLowerCase()}/quests`, { namespace: 'profile' });
    return in_progress;
}
export async function characterQuestsCompleted(realmSlug, characterName) {
    const { quests } = await get(`profile/wow/character/${realmSlug}/${characterName.toLowerCase()}/quests/completed`, { namespace: 'profile' });
    return quests;
}
export async function characterReputations(realmSlug, characterName) {
    const { reputations } = await get(`profile/wow/character/${realmSlug}/${characterName.toLowerCase()}/reputations`, { namespace: 'profile' });
    return reputations;
}
export async function characterSoulbinds(realmSlug, characterName) {
    const { soulbinds } = await get(`profile/wow/character/${realmSlug}/${characterName.toLowerCase()}/soulbinds`, { namespace: 'profile' });
    return soulbinds;
}
export async function characterSpecializations(realmSlug, characterName) {
    const { specializations } = await get(`profile/wow/character/${realmSlug}/${characterName.toLowerCase()}/specializations`, { namespace: 'profile' });
    return specializations;
}
export async function characterStatistics(realmSlug, characterName) {
    return await get(`profile/wow/character/${realmSlug}/${characterName.toLowerCase()}/statistics`, { namespace: 'profile' });
}
export async function characterTitles(realmSlug, characterName) {
    const { titles } = await get(`profile/wow/character/${realmSlug}/${characterName.toLowerCase()}/titles`, { namespace: 'profile' });
    return titles;
}
function connectedRealmRefFromRef(ref) {
    ref.id = parseInt((ref.href.match(/connected-realm\/(\d+)/) || { 1: '-1' })[1]);
    return ref;
}
export async function connectedRealms() {
    const { connected_realms } = await get('data/wow/connected-realm/index', { namespace: 'dynamic' });
    return connected_realms.map((e) => connectedRealmRefFromRef(e));
}
export async function connectedRealm(id) {
    const result = await get(`data/wow/connected-realm/${id}`, { namespace: 'dynamic' });
    result.realms.forEach(e => connectedRealmRefFromRef(e.connected_realm));
    return result;
}
export async function guild(realmSlug, nameSlug) {
    return await get(`data/wow/guild/${realmSlug}/${nameSlug}`, { namespace: 'profile' });
}
export async function guildActivity(realmSlug, nameSlug) {
    const { activities } = await get(`data/wow/guild/${realmSlug}/${nameSlug}/activity`, { namespace: 'profile' });
    return activities;
}
export async function guildAchievements(realmSlug, nameSlug) {
    return await get(`data/wow/guild/${realmSlug}/${nameSlug}/achievements`, { namespace: 'profile' });
}
export async function guildRoster(realmSlug, nameSlug) {
    const { members } = await get(`data/wow/guild/${realmSlug}/${nameSlug}/roster`, { namespace: 'profile' });
    return members;
}
export async function guildCrestComponents() {
    return await get(`data/wow/guild-crest/index`, { namespace: 'static' });
}
export async function guildCrestBorderMedia(id) {
    return await get(`data/wow/media/guild-crest/border/${id}`, { namespace: 'static' });
}
export async function guildCrestEmblemMedia(id) {
    return await get(`data/wow/media/guild-crest/emblem/${id}`, { namespace: 'static' });
}
export async function itemClasses() {
    const { item_classes } = await get('data/wow/item-class/index', { namespace: 'static' });
    return item_classes;
}
export async function itemClass(id) {
    return await get(`data/wow/item-class/${id}`, { namespace: 'static' });
}
export async function itemSubclass(classId, subclassId) {
    return await get(`data/wow/item-class/${classId}/item-subclass/${subclassId}`, { namespace: 'static' });
}
export async function itemSets() {
    const { item_sets } = await get('data/wow/item-set/index', { namespace: 'static' });
    return item_sets;
}
export async function itemSet(id) {
    return await get(`data/wow/item-set/${id}`, { namespace: 'static' });
}
export async function item(id) {
    return await get(`data/wow/item/${id}`, { namespace: 'static' });
}
export async function itemMedia(id) {
    return await get(`data/wow/media/item/${id}`, { namespace: 'static' });
}
export async function journalExpansions() {
    const { tiers } = await get('data/wow/journal-expansion/index', { namespace: 'static' });
    return tiers;
}
export async function journalExpansion(id) {
    return await get(`data/wow/journal-expansion/${id}`, { namespace: 'static' });
}
export async function journalEncounters() {
    const { encounters } = await get('data/wow/journal-encounter/index', { namespace: 'static' });
    return encounters;
}
export async function journalEncounter(id) {
    return await get(`data/wow/journal-encounter/${id}`, { namespace: 'static' });
}
export async function journalInstances() {
    const { instances } = await get('data/wow/journal-instance/index', { namespace: 'static' });
    return instances;
}
export async function journalInstance(id) {
    return await get(`data/wow/journal-instance/${id}`, { namespace: 'static' });
}
export async function journalInstanceMedia(id) {
    return await get(`data/wow/media/journal-instance/${id}`, { namespace: 'static' });
}
export async function mounts() {
    const { mounts } = await get('data/wow/mount/index', { namespace: 'static' });
    return mounts;
}
export async function mount(id) {
    return await get(`data/wow/mount/${id}`, { namespace: 'static' });
}
export async function mythicKeystoneAffixes() {
    const { affixes } = await get('data/wow/keystone-affix/index', { namespace: 'static' });
    return affixes;
}
export async function mythicKeystoneAffix(id) {
    return await get(`data/wow/keystone-affix/${id}`, { namespace: 'static' });
}
export async function mythicKeystoneAffixMedia(id) {
    return await get(`data/wow/media/keystone-affix/${id}`, { namespace: 'static' });
}
export async function mythicKeystoneDungeons() {
    const { dungeons } = await get('data/wow/mythic-keystone/dungeon/index', { namespace: 'dynamic' });
    return dungeons;
}
export async function mythicKeystoneDungeon(id) {
    return await get(`data/wow/mythic-keystone/dungeon/${id}`, { namespace: 'dynamic' });
}
export async function mythicKeystonePeriods() {
    return await get('data/wow/mythic-keystone/period/index', { namespace: 'dynamic' });
}
export async function mythicKeystonePeriod(id) {
    return await get(`data/wow/mythic-keystone/period/${id}`, { namespace: 'dynamic' });
}
export async function mythicKeystoneSeasons() {
    return await get('data/wow/mythic-keystone/season/index', { namespace: 'dynamic' });
}
export async function mythicKeystoneSeason(id) {
    return await get(`data/wow/mythic-keystone/season/${id}`, { namespace: 'dynamic' });
}
function mythicKeystoneLeaderboardRefFromRef(ref) {
    ref.period = parseInt((ref.key.href.match(/period\/(\d+)/) || { 1: '-1' })[1]);
    return ref;
}
export async function mythicKeystoneLeaderboards(connectedRealmId) {
    const { current_leaderboards } = await get(`data/wow/connected-realm/${connectedRealmId}/mythic-leaderboard/index`, { namespace: 'dynamic' });
    return current_leaderboards.map((e) => mythicKeystoneLeaderboardRefFromRef(e));
}
export async function mythicKeystoneLeaderboard(connectedRealmId, dungeonId, period) {
    const result = await get(`data/wow/connected-realm/${connectedRealmId}/mythic-leaderboard/${dungeonId}/period/${period}`, { namespace: 'dynamic' });
    connectedRealmRefFromRef(result.connected_realm);
    return result;
}
export async function mythicRaidLeaderboard(raid, faction) {
    const { entries } = await get(`data/wow/leaderboard/hall-of-fame/${raid}/${faction}`, { namespace: 'dynamic' });
    return entries;
}
export async function pets() {
    const { pets } = await get('data/wow/pet/index', { namespace: 'static' });
    return pets;
}
export async function pet(id) {
    return await get(`data/wow/pet/${id}`, { namespace: 'static' });
}
export async function petMedia(id) {
    return await get(`data/wow/media/pet/${id}`, { namespace: 'static' });
}
export async function petAbilities() {
    const { abilities } = await get('data/wow/pet-ability/index', { namespace: 'static' });
    return abilities;
}
export async function petAbility(id) {
    return await get(`data/wow/pet-ability/${id}`, { namespace: 'static' });
}
export async function petAbilityMedia(id) {
    return await get(`data/wow/media/pet-ability/${id}`, { namespace: 'static' });
}
export async function playableClasses() {
    const { classes } = await get('data/wow/playable-class/index', { namespace: 'static' });
    return classes;
}
export async function playableClass(id) {
    return await get(`data/wow/playable-class/${id}`, { namespace: 'static' });
}
export async function playableClassMedia(id) {
    return await get(`data/wow/media/playable-class/${id}`, { namespace: 'static' });
}
export async function playableClassPvpTalentSlots(id) {
    const { talent_slots } = await get(`data/wow/playable-class/${id}/pvp-talent-slots`, { namespace: 'static' });
    return talent_slots;
}
export async function playableRaces() {
    const { races } = await get('data/wow/playable-race/index', { namespace: 'static' });
    return races;
}
export async function playableRace(id) {
    return await get(`data/wow/playable-race/${id}`, { namespace: 'static' });
}
export async function playableSpecializations() {
    return await get('data/wow/playable-specialization/index', { namespace: 'static' });
}
export async function playableSpecialization(id) {
    return await get(`data/wow/playable-specialization/${id}`, { namespace: 'static' });
}
export async function playableSpecializationMedia(id) {
    return await get(`data/wow/media/playable-specialization/${id}`, { namespace: 'static' });
}
export async function powerTypes() {
    const { power_types } = await get('data/wow/power-type/index', { namespace: 'static' });
    return power_types;
}
export async function powerType(id) {
    return await get(`data/wow/power-type/${id}`, { namespace: 'static' });
}
export async function professions() {
    const { professions } = await get('data/wow/profession/index', { namespace: 'static' });
    return professions;
}
export async function profession(id) {
    return await get(`data/wow/profession/${id}`, { namespace: 'static' });
}
export async function professionMedia(id) {
    return await get(`data/wow/media/profession/${id}`, { namespace: 'static' });
}
export async function professionSkillTier(id, skillTierId) {
    return await get(`data/wow/profession/${id}/skill-tier/${skillTierId}`, { namespace: 'static' });
}
export async function recipe(id) {
    return await get(`data/wow/recipe/${id}`, { namespace: 'static' });
}
export async function recipeMedia(id) {
    return await get(`data/wow/media/recipe/${id}`, { namespace: 'static' });
}
export async function quest(id) {
    return await get(`data/wow/quest/${id}`, { namespace: 'static' });
}
export async function questCategories() {
    const { categories } = await get('data/wow/quest/category/index', { namespace: 'static' });
    return categories;
}
export async function questCategory(id) {
    return await get(`data/wow/quest/category/${id}`, { namespace: 'static' });
}
export async function questAreas() {
    const { areas } = await get('data/wow/quest/area/index', { namespace: 'static' });
    return areas;
}
export async function questArea(id) {
    return await get(`data/wow/quest/area/${id}`, { namespace: 'static' });
}
export async function questTypes() {
    const { types } = await get('data/wow/quest/type/index', { namespace: 'static' });
    return types;
}
export async function questType(id) {
    return await get(`data/wow/quest/type/${id}`, { namespace: 'static' });
}
export async function realms() {
    const { realms } = await get('data/wow/realm/index', { namespace: 'dynamic' });
    return realms;
}
export async function realm(slug) {
    const result = await get(`data/wow/realm/${slug}`, { namespace: 'dynamic' });
    result.connected_realm = connectedRealmRefFromRef(result.connected_realm);
    return result;
}
function regionRefFromRef(ref) {
    ref.id = parseInt((ref.href.match(/region\/(\d+)/) || { 1: '-1' })[1]);
    return ref;
}
export async function regions() {
    const { regions } = await get('data/wow/region/index', { namespace: 'dynamic' });
    regions.forEach((e) => regionRefFromRef(e));
    return regions;
}
export async function region(id) {
    return await get(`data/wow/region/${id}`, { namespace: 'dynamic' });
}
export async function reputationFactions() {
    return await get('data/wow/reputation-faction/index', { namespace: 'static' });
}
export async function reputationFaction(id) {
    return await get(`data/wow/reputation-faction/${id}`, { namespace: 'static' });
}
export async function reputationTiersList() {
    const { reputation_tiers } = await get('data/wow/reputation-tiers/index', { namespace: 'static' });
    return reputation_tiers;
}
export async function reputationTiers(id) {
    return await get(`data/wow/reputation-tiers/${id}`, { namespace: 'static' });
}
export async function spell(id) {
    return await get(`data/wow/spell/${id}`, { namespace: 'static' });
}
export async function spellMedia(id) {
    return await get(`data/wow/media/spell/${id}`, { namespace: 'static' });
}
export async function talents() {
    const { talents } = await get('data/wow/talent/index', { namespace: 'static' });
    return talents;
}
export async function talent(id) {
    return await get(`data/wow/talent/${id}`, { namespace: 'static' });
}
export async function pvpTalents() {
    const { pvp_talents } = await get('data/wow/pvp-talent/index', { namespace: 'static' });
    return pvp_talents;
}
export async function pvpTalent(id) {
    return await get(`data/wow/pvp-talent/${id}`, { namespace: 'static' });
}
export async function techTalentTrees() {
    const { talent_trees } = await get('data/wow/tech-talent-tree/index', { namespace: 'static' });
    return talent_trees;
}
export async function techTalentTree(id) {
    return await get(`data/wow/tech-talent-tree/${id}`, { namespace: 'static' });
}
export async function techTalents() {
    const { talents } = await get('data/wow/tech-talent/index', { namespace: 'static' });
    return talents;
}
export async function techTalent(id) {
    return await get(`data/wow/tech-talent/${id}`, { namespace: 'static' });
}
export async function techTalentMedia(id) {
    return await get(`data/wow/media/tech-talent/${id}`, { namespace: 'static' });
}
export async function titles() {
    const { titles } = await get('data/wow/title/index', { namespace: 'static' });
    return titles;
}
export async function title(id) {
    return await get(`data/wow/title/${id}`, { namespace: 'static' });
}
export async function wowToken() {
    return await get('data/wow/token/index', { namespace: 'dynamic' });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid293LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsid293LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxXQUFXLENBQUE7QUE0Si9CLE1BQU0sQ0FBQyxLQUFLLFVBQVUscUJBQXFCO0lBQ3ZDLE9BQU8sTUFBTSxHQUFHLENBQUMscUNBQXFDLEVBQUUsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQTtBQUNwRixDQUFDO0FBRUQsTUFBTSxDQUFDLEtBQUssVUFBVSxtQkFBbUIsQ0FBQyxFQUFVO0lBQ2hELE9BQU8sTUFBTSxHQUFHLENBQUMsaUNBQWlDLEVBQUUsRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUE7QUFDcEYsQ0FBQztBQUVELE1BQU0sQ0FBQyxLQUFLLFVBQVUsWUFBWTtJQUM5QixNQUFNLEVBQUUsWUFBWSxFQUFFLEdBQUcsTUFBTSxHQUFHLENBQUMsNEJBQTRCLEVBQUUsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQTtJQUN6RixPQUFPLFlBQVksQ0FBQTtBQUN2QixDQUFDO0FBRUQsTUFBTSxDQUFDLEtBQUssVUFBVSxXQUFXLENBQUMsRUFBVTtJQUN4QyxPQUFPLE1BQU0sR0FBRyxDQUFDLHdCQUF3QixFQUFFLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFBO0FBQzNFLENBQUM7QUFFRCxNQUFNLENBQUMsS0FBSyxVQUFVLGdCQUFnQixDQUFDLEVBQVU7SUFDN0MsT0FBTyxNQUFNLEdBQUcsQ0FBQyw4QkFBOEIsRUFBRSxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQTtBQUNqRixDQUFDO0FBMkJELE1BQU0sQ0FBQyxLQUFLLFVBQVUsUUFBUSxDQUFDLGdCQUF3QjtJQUNuRCxNQUFNLEVBQUUsUUFBUSxFQUFFLEdBQUcsTUFBTSxHQUFHLENBQUMsNEJB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