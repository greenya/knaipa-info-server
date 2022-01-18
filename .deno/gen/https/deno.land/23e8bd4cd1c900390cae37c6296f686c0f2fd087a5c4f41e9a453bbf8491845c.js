import { get } from './core.ts';
export async function playableRaces() {
    const { races } = await get('data/wow/playable-race/index', { namespace: 'static' });
    return races;
}
export async function playableRace(id) {
    return await get(`data/wow/playable-race/${id}`, { namespace: 'static' });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid293LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsid293LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxXQUFXLENBQUE7QUFrQi9CLE1BQU0sQ0FBQyxLQUFLLFVBQVUsYUFBYTtJQUMvQixNQUFNLEVBQUUsS0FBSyxFQUFFLEdBQUcsTUFBTSxHQUFHLENBQUMsOEJBQThCLEVBQUUsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQTtJQUNwRixPQUFPLEtBQUssQ0FBQTtBQUNoQixDQUFDO0FBRUQsTUFBTSxDQUFDLEtBQUssVUFBVSxZQUFZLENBQUMsRUFBVTtJQUN6QyxPQUFPLE1BQU0sR0FBRyxDQUFDLDBCQUEwQixFQUFFLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFBO0FBQzdFLENBQUMifQ==