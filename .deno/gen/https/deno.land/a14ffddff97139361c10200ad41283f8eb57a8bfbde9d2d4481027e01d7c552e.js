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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid293LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsid293LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxXQUFXLENBQUE7QUFrSi9CLE1BQU0sQ0FBQyxLQUFLLFVBQVUscUJBQXFCO0lBQ3ZDLE9BQU8sTUFBTSxHQUFHLENBQUMscUNBQXFDLEVBQUUsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQTtBQUNwRixDQUFDO0FBRUQsTUFBTSxDQUFDLEtBQUssVUFBVSxtQkFBbUIsQ0FBQyxFQUFVO0lBQ2hELE9BQU8sTUFBTSxHQUFHLENBQUMsaUNBQWlDLEVBQUUsRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUE7QUFDcEYsQ0FBQztBQUVELE1BQU0sQ0FBQyxLQUFLLFVBQVUsWUFBWTtJQUM5QixNQUFNLEVBQUUsWUFBWSxFQUFFLEdBQUcsTUFBTSxHQUFHLENBQUMsNEJBQTRCLEVBQUUsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQTtJQUN6RixPQUFPLFlBQVksQ0FBQTtBQUN2QixDQUFDO0FBRUQsTUFBTSxDQUFDLEtBQUssVUFBVSxXQUFXLENBQUMsRUFBVTtJQUN4QyxPQUFPLE1BQU0sR0FBRyxDQUFDLHdCQUF3QixFQUFFLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFBO0FBQzNFLENBQUM7QUFFRCxNQUFNLENBQUMsS0FBSyxVQUFVLGdCQUFnQixDQUFDLEVBQVU7SUFDN0MsT0FBTyxNQUFNLEdBQUcsQ0FBQyw4QkFBOEIsRUFBRSxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQTtBQUNqRixDQUFDO0FBMkJELE1BQU0sQ0FBQyxLQUFLLFVBQVUsUUFBUSxDQUFDLGdCQUF3QjtJQUNuRCxNQUFNLEVBQUUsUUFBUSxFQUFFLEdBQUcsTUFBTSxHQUFHLENBQUMsNEJB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