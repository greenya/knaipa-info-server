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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid293LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsid293LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxXQUFXLENBQUE7QUFxRS9CLE1BQU0sQ0FBQyxLQUFLLFVBQVUscUJBQXFCO0lBQ3ZDLE9BQU8sTUFBTSxHQUFHLENBQUMscUNBQXFDLEVBQUUsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQTtBQUNwRixDQUFDO0FBRUQsTUFBTSxDQUFDLEtBQUssVUFBVSxtQkFBbUIsQ0FBQyxFQUFVO0lBQ2hELE9BQU8sTUFBTSxHQUFHLENBQUMsaUNBQWlDLEVBQUUsRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUE7QUFDcEYsQ0FBQztBQUVELE1BQU0sQ0FBQyxLQUFLLFVBQVUsWUFBWTtJQUM5QixNQUFNLEVBQUUsWUFBWSxFQUFFLEdBQUcsTUFBTSxHQUFHLENBQUMsNEJBQTRCLEVBQUUsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQTtJQUN6RixPQUFPLFlBQVksQ0FBQTtBQUN2QixDQUFDO0FBRUQsTUFBTSxDQUFDLEtBQUssVUFBVSxXQUFXLENBQUMsRUFBVTtJQUN4QyxPQUFPLE1BQU0sR0FBRyxDQUFDLHdCQUF3QixFQUFFLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFBO0FBQzNFLENBQUM7QUFFRCxNQUFNLENBQUMsS0FBSyxVQUFVLGdCQUFnQixDQUFDLEVBQVU7SUFDN0MsT0FBTyxNQUFNLEdBQUcsQ0FBQyw4QkFBOEIsRUFBRSxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQTtBQUNqRixDQUFDO0FBdUdELE1BQU0sQ0FBQyxLQUFLLFVBQVUsV0FBVztJQUM3QixNQUFNLEVBQUUsWUFBWSxFQUFFLEdBQUcsTUFBTSxHQUFHLENBQUMsMkJBQTJCLEVBQUUsRUFB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