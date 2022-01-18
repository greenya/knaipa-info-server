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
async function request(url, args, retryForTooManyRequests = true) {
    const euc = encodeURIComponent;
    const query = Object.keys(args).reduce((a, k, i) => a + (i == 0 ? '?' : '&') + euc(k) + '=' + euc(args[k]), '');
    const response = await fetch(url + query);
    if (response.ok) {
        log(url);
        return await response.json();
    }
    else {
        error('Request failed:', response.status, response.statusText, url);
        if (response.status == 429 && retryForTooManyRequests) {
            log('Retrying soon...');
            await new Promise(r => setTimeout(r, 5000));
            return await request(url, args, false);
        }
        else {
            return false;
        }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsTUFBTSxXQUFXLENBQUE7QUFZdEMsSUFBSSxNQU1ILENBQUE7QUFFRCxNQUFNLENBQUMsS0FBSyxVQUFVLElBQUksQ0FBQyxHQUFXLEVBQUUsTUFBYyxFQUFFLE1BQWMsRUFBRSxNQUFjO0lBQ2xGLE1BQU0sR0FBRyxHQUFHLE1BQU0sSUFBSSxJQUFJO1FBQ3RCLENBQUMsQ0FBQywwQ0FBMEM7UUFDNUMsQ0FBQyxDQUFDLFdBQVcsTUFBTSx5QkFBeUIsQ0FBQTtJQUVoRCxNQUFNLFFBQVEsR0FBRyxNQUFNLEtBQUssQ0FBQyxHQUFHLEVBQUU7UUFDOUIsTUFBTSxFQUFFLE1BQU07UUFDZCxPQUFPLEVBQUU7WUFDTCxlQUFlLEVBQUUsUUFBUSxHQUFHLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxNQUFNLEVBQUUsQ0FBQztZQUNwRCxjQUFjLEVBQUUsbUNBQW1DO1NBQ3REO1FBQ0QsSUFBSSxFQUFFLCtCQUErQjtLQUN4QyxDQUFDLENBQUE7SUFFRixJQUFJLFFBQVEsQ0FBQyxFQUFFLEVBQUU7UUFDYixNQUFNLElBQUksR0FBRyxNQUFNLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQTtRQUNsQyxNQUFNLEdBQUc7WUFDTCxNQUFNO1lBQ04sTUFBTTtZQUNOLEtBQUssRUFBRSxJQUFJLENBQUMsWUFBWTtZQUN4QixlQUFlLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUMzQixjQUFjLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSTtTQUN0RCxDQUFBO1FBQ0QsR0FBRyxDQUFDLGlCQUFpQixDQUFDLENBQUE7UUFDdEIsT0FBTyxJQUFJLENBQUE7S0FDZDtTQUFNO1FBQ0gsS0FBSyxDQUFDLGNBQWMsRUFBRSxRQUFRLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQTtRQUMzRCxPQUFPLEtBQUssQ0FBQTtLQUNmO0FBQ0wsQ0FBQztBQUdELEtBQUssVUFBVSxPQUFPLENBQUMsR0FBVyxFQUFFLElBQTZCLEVBQUUsdUJBQXVCLEdBQUcsSUFBSTtJQUM3RixNQUFNLEdBQUcsR0FBRyxrQkFBa0IsQ0FBQTtJQUM5QixNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFBO0lBQy9HLE1BQU0sUUFBUSxHQUFHLE1BQU0sS0FBSyxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsQ0FBQTtJQUV6QyxJQUFJLFFBQVEsQ0FBQyxFQUFFLEVBQUU7UUFDYixHQUFHLENBQUMsR0FBRyxDQUFDLENBQUE7UUFDUixPQUFPLE1BQU0sUUFBUSxDQUFDLElBQUksRUFBRSxDQUFBO0tBQy9CO1NBQU07UUFDSCxLQUFLLENBQUMsaUJBQWlCLEVBQUUsUUFBUSxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsVUFBVSxFQUFFLEdBQUcsQ0FBQyxDQUFBO1FBQ25FLElBQUksUUFBUSxDQUFDLE1BQU0sSUFBSSxHQUFHLElBQUksdUJBQXVCLEVBQUU7WUFDbkQsR0FBRyxDQUFDLGtCQUFrQixDQUFDLENBQUE7WUFDdkIsTUFBTSxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQTtZQUMzQyxPQUFPLE1BQU0sT0FBTyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUE7U0FDekM7YUFBTTtZQUNILE9BQU8sS0FBSyxDQUFBO1NBQ2Y7S0FDSjtBQUNMLENBQUM7QUFFRCxNQUFNLENBQUMsS0FBSyxVQUFVLEdBQUcsQ0FBQyxPQUFlLEVBQUUsSUFBNkI7SUFDcEUsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO1FBQ2hCLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUE7S0FDeEM7SUFFRCxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUE7SUFDM0IsSUFBSSxDQUFDLFlBQVksR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFBO0lBRWhDLE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxNQUFNLElBQUksSUFBSTtRQUM5QixDQUFDLENBQUMsbUNBQW1DO1FBQ3JDLENBQUMsQ0FBQyxXQUFXLE1BQU0sQ0FBQyxNQUFNLG9CQUFvQixDQUFBO0lBRWxELE9BQU8sTUFBTSxPQUFPLENBQUMsSUFBSSxHQUFHLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQTtBQUM5QyxDQUFDIn0=