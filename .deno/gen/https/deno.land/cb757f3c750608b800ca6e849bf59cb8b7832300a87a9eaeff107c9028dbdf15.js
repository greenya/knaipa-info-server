import { get } from './core.ts';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid293LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsid293LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxXQUFXLENBQUE7QUEwQy9CLE1BQU0sQ0FBQyxLQUFLLFVBQVUsZUFBZTtJQUNqQyxNQUFNLEVBQUUsT0FBTyxFQUFFLEdBQUcsTUFBTSxHQUFHLENBQUMsK0JBQStCLEVBQUUsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQTtJQUN2RixPQUFPLE9BQU8sQ0FBQTtBQUNsQixDQUFDO0FBRUQsTUFBTSxDQUFDLEtBQUssVUFBVSxhQUFhLENBQUMsRUFBVTtJQUMxQyxPQUFPLE1BQU0sR0FBRyxDQUFDLDJCQUEyQixFQUFFLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFBO0FBQzlFLENBQUM7QUFFRCxNQUFNLENBQUMsS0FBSyxVQUFVLGtCQUFrQixDQUFDLEVBQVU7SUFDL0MsT0FBTyxNQUFNLEdBQUcsQ0FBQyxpQ0FBaUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQTtBQUNwRixDQUFDO0FBRUQsTUFBTSxDQUFDLEtBQUssVUFBVSwyQkFBMkIsQ0FBQyxFQUFVO0lBQ3hELE1BQU0sRUFBRSxZQUFZLEVBQUUsR0FBRyxNQUFNLEdBQUcsQ0FBQywyQkFBMkIsRUFBRSxtQkFBbUIsRUFBRSxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFBO0lBQzdHLE9BQU8sWUFBWSxDQUFBO0FBQ3ZCLENBQUM7QUFXRCxNQUFNLENBQUMsS0FBSyxVQUFVLGFBQWE7SUFDL0IsTUFBTSxFQUFFLEtBQUssRUFBRSxHQUFHLE1BQU0sR0FBRyxDQUFDLDhCQUE4QixFQUFFLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUE7SUFDcEYsT0FBTyxLQUFLLENBQUE7QUFDaEIsQ0FBQztBQUVELE1BQU0s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