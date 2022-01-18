import { log, error } from './util.ts';
let config;
export async function auth(key, secret, region, locale) {
    const uri = region == 'cn'
        ? 'https://www.battlenet.com.cn/oauth/token'
        : `https://${region}.battle.net/oauth/token`;
    const response = await fetch(uri, {
        method: 'POST',
        headers: {
            'Authorization': 'Basic ' + btoa(`${key}:${secret}`),
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'grant_type=client_credentials'
    });
    if (response.ok) {
        const data = await response.json();
        config = {
            region,
            locale,
            token: data.access_token,
            tokenReceivedAt: Date.now(),
            tokenExpiresAt: Date.now() + data.expires_in * 1000
        };
        log('Auth successful');
        return true;
    }
    else {
        error('Auth failed:', response.status, response.statusText);
        return false;
    }
}
async function request(url, args) {
    const euc = encodeURIComponent;
    const query = Object.keys(args).reduce((a, k, i) => a + (i == 0 ? '?' : '&') + euc(k) + '=' + euc(args[k]), '');
    const response = await fetch(url + query);
    if (response.ok) {
        log('Request successful:', url);
        return await response.json();
    }
    else {
        error('Request failed:', response.status, response.statusText, url);
        return false;
    }
}
export async function get(service, args) {
    if (args.namespace) {
        args.namespace += `-${config.region}`;
    }
    args.locale = config.locale;
    args.access_token = config.token;
    const host = config.region == 'cn'
        ? 'https://gateway.battlenet.com.cn/'
        : `https://${config.region}.api.blizzard.com/`;
    return await request(host + service, args);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsTUFBTSxXQUFXLENBQUE7QUFZdEMsSUFBSSxNQU1ILENBQUE7QUFFRCxNQUFNLENBQUMsS0FBSyxVQUFVLElBQUksQ0FBQyxHQUFXLEVBQUUsTUFBYyxFQUFFLE1BQWMsRUFBRSxNQUFjO0lBQ2xGLE1BQU0sR0FBRyxHQUFHLE1BQU0sSUFBSSxJQUFJO1FBQ3RCLENBQUMsQ0FBQywwQ0FBMEM7UUFDNUMsQ0FBQyxDQUFDLFdBQVcsTUFBTSx5QkFBeUIsQ0FBQTtJQUVoRCxNQUFNLFFBQVEsR0FBRyxNQUFNLEtBQUssQ0FBQyxHQUFHLEVBQUU7UUFDOUIsTUFBTSxFQUFFLE1BQU07UUFDZCxPQUFPLEVBQUU7WUFDTCxlQUFlLEVBQUUsUUFBUSxHQUFHLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxNQUFNLEVBQUUsQ0FBQztZQUNwRCxjQUFjLEVBQUUsbUNBQW1DO1NBQ3REO1FBQ0QsSUFBSSxFQUFFLCtCQUErQjtLQUN4QyxDQUFDLENBQUE7SUFFRixJQUFJLFFBQVEsQ0FBQyxFQUFFLEVBQUU7UUFDYixNQUFNLElBQUksR0FBRyxNQUFNLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQTtRQUNsQyxNQUFNLEdBQUc7WUFDTCxNQUFNO1lBQ04sTUFBTTtZQUNOLEtBQUssRUFBRSxJQUFJLENBQUMsWUFBWTtZQUN4QixlQUFlLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUMzQixjQUFjLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSTtTQUN0RCxDQUFBO1FBQ0QsR0FBRyxDQUFDLGlCQUFpQixDQUFDLENBQUE7UUFDdEIsT0FBTyxJQUFJLENBQUE7S0FDZDtTQUFNO1FBQ0gsS0FBSyxDQUFDLGNBQWMsRUFBRSxRQUFRLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQTtRQUMzRCxPQUFPLEtBQUssQ0FBQTtLQUNmO0FBQ0wsQ0FBQztBQUVELEtBQUssVUFBVSxPQUFPLENBQUMsR0FBVyxFQUFFLElBQTZCO0lBQzdELE1BQU0sR0FBRyxHQUFHLGtCQUFrQixDQUFBO0lBQzlCLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUE7SUFDL0csTUFBTSxRQUFRLEdBQUcsTUFBTSxLQUFLLENBQUMsR0FBRyxHQUFHLEtBQUssQ0FBQyxDQUFBO0lBRXpDLElBQUksUUFBUSxDQUFDLEVBQUUsRUFBRTtRQUNiLEdBQUcsQ0FBQyxxQkFBcUIsRUFBRSxHQUFHLENBQUMsQ0FBQTtRQUMvQixPQUFPLE1BQU0sUUFBUSxDQUFDLElBQUksRUFBRSxDQUFBO0tBQy9CO1NBQU07UUFDSCxLQUFLLENBQUMsaUJBQWlCLEVBQUUsUUFBUSxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsVUFBVSxFQUFFLEdBQUcsQ0FBQyxDQUFBO1FBQ25FLE9BQU8sS0FBSyxDQUFBO0tBQ2Y7QUFDTCxDQUFDO0FBRUQsTUFBTSxDQUFDLEtBQUssVUFBVSxHQUFHLENBQUMsT0FBZSxFQUFFLElBQTZCO0lBQ3BFLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtRQUNoQixJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFBO0tBQ3hDO0lBRUQsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFBO0lBQzNCLElBQUksQ0FBQyxZQUFZLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQTtJQUVoQyxNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsTUFBTSxJQUFJLElBQUk7UUFDOUIsQ0FBQyxDQUFDLG1DQUFtQztRQUNyQyxDQUFDLENBQUMsV0FBVyxNQUFNLENBQUMsTUFBTSxvQkFBb0IsQ0FBQTtJQUVsRCxPQUFPLE1BQU0sT0FBTyxDQUFDLElBQUksR0FBRyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUE7QUFDOUMsQ0FBQyJ9