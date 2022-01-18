import { trace, error } from './util.ts';
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
        trace('Auth successful', config);
        return true;
    }
    else {
        error('Auth failed', response);
        return false;
    }
}
async function request(url, args) {
    const euc = encodeURIComponent;
    const query = Object.keys(args).reduce((a, k, i) => a + (i == 0 ? '?' : '&') + euc(k) + '=' + euc(args[k]), '');
    const response = await fetch(url + query);
    if (response.ok) {
        trace('Request successful', response.url);
        return await response.json();
    }
    else {
        error('Request failed', response);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsTUFBTSxXQUFXLENBQUE7QUFZeEMsSUFBSSxNQU1ILENBQUE7QUFFRCxNQUFNLENBQUMsS0FBSyxVQUFVLElBQUksQ0FBQyxHQUFXLEVBQUUsTUFBYyxFQUFFLE1BQWMsRUFBRSxNQUFjO0lBQ2xGLE1BQU0sR0FBRyxHQUFHLE1BQU0sSUFBSSxJQUFJO1FBQ3RCLENBQUMsQ0FBQywwQ0FBMEM7UUFDNUMsQ0FBQyxDQUFDLFdBQVcsTUFBTSx5QkFBeUIsQ0FBQTtJQUVoRCxNQUFNLFFBQVEsR0FBRyxNQUFNLEtBQUssQ0FBQyxHQUFHLEVBQUU7UUFDOUIsTUFBTSxFQUFFLE1BQU07UUFDZCxPQUFPLEVBQUU7WUFDTCxlQUFlLEVBQUUsUUFBUSxHQUFHLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxNQUFNLEVBQUUsQ0FBQztZQUNwRCxjQUFjLEVBQUUsbUNBQW1DO1NBQ3REO1FBQ0QsSUFBSSxFQUFFLCtCQUErQjtLQUN4QyxDQUFDLENBQUE7SUFFRixJQUFJLFFBQVEsQ0FBQyxFQUFFLEVBQUU7UUFDYixNQUFNLElBQUksR0FBRyxNQUFNLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQTtRQUNsQyxNQUFNLEdBQUc7WUFDTCxNQUFNO1lBQ04sTUFBTTtZQUNOLEtBQUssRUFBRSxJQUFJLENBQUMsWUFBWTtZQUN4QixlQUFlLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUMzQixjQUFjLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSTtTQUN0RCxDQUFBO1FBQ0QsS0FBSyxDQUFDLGlCQUFpQixFQUFFLE1BQU0sQ0FBQyxDQUFBO1FBQ2hDLE9BQU8sSUFBSSxDQUFBO0tBQ2Q7U0FBTTtRQUNILEtBQUssQ0FBQyxhQUFhLEVBQUUsUUFBUSxDQUFDLENBQUE7UUFDOUIsT0FBTyxLQUFLLENBQUE7S0FDZjtBQUNMLENBQUM7QUFFRCxLQUFLLFVBQVUsT0FBTyxDQUFDLEdBQVcsRUFBRSxJQUE2QjtJQUM3RCxNQUFNLEdBQUcsR0FBRyxrQkFBa0IsQ0FBQTtJQUM5QixNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFBO0lBQy9HLE1BQU0sUUFBUSxHQUFHLE1BQU0sS0FBSyxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsQ0FBQTtJQUV6QyxJQUFJLFFBQVEsQ0FBQyxFQUFFLEVBQUU7UUFDYixLQUFLLENBQUMsb0JBQW9CLEVBQUUsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQ3pDLE9BQU8sTUFBTSxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUE7S0FDL0I7U0FBTTtRQUNILEtBQUssQ0FBQyxnQkFBZ0IsRUFBRSxRQUFRLENBQUMsQ0FBQTtRQUNqQyxPQUFPLEtBQUssQ0FBQTtLQUNmO0FBQ0wsQ0FBQztBQUVELE1BQU0sQ0FBQyxLQUFLLFVBQVUsR0FBRyxDQUFDLE9BQWUsRUFBRSxJQUE2QjtJQUNwRSxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7UUFDaEIsSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQTtLQUN4QztJQUVELElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQTtJQUMzQixJQUFJLENBQUMsWUFBWSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUE7SUFFaEMsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLE1BQU0sSUFBSSxJQUFJO1FBQzlCLENBQUMsQ0FBQyxtQ0FBbUM7UUFDckMsQ0FBQyxDQUFDLFdBQVcsTUFBTSxDQUFDLE1BQU0sb0JBQW9CLENBQUE7SUFFbEQsT0FBTyxNQUFNLE9BQU8sQ0FBQyxJQUFJLEdBQUcsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFBO0FBQzlDLENBQUMifQ==