function log(...args) { console.log(...args); }
function error(...args) { console.error(...args); }
async function auth(key, secret, region, locale) {
    const response = await fetch(`https://${region}.battle.net/oauth/token`, {
        method: 'POST',
        headers: {
            'Authorization': 'Basic ' + btoa(`${key}:${secret}`),
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'grant_type=client_credentials'
    });
    if (response.status >= 200 && response.status <= 299) {
        log('Auth successful, token received');
        const data = await response.json();
        return {
            region,
            locale,
            token: data.access_token,
            tokenReceivedAt: Date.now(),
            tokenExpiresIn: data.expires_in
        };
    }
    else {
        error('Auth failed', response);
        return false;
    }
}
export default {
    auth
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm5hcGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJibmFwaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxTQUFTLEdBQUcsQ0FBQyxHQUFHLElBQVcsSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUEsQ0FBQyxDQUFDO0FBQ3JELFNBQVMsS0FBSyxDQUFDLEdBQUcsSUFBVyxJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQSxDQUFDLENBQUM7QUFFekQsS0FBSyxVQUFVLElBQUksQ0FBQyxHQUFXLEVBQUUsTUFBYyxFQUFFLE1BQWMsRUFBRSxNQUFjO0lBQzNFLE1BQU0sUUFBUSxHQUFHLE1BQU0sS0FBSyxDQUFDLFdBQVcsTUFBTSx5QkFBeUIsRUFBRTtRQUNyRSxNQUFNLEVBQUUsTUFBTTtRQUNkLE9BQU8sRUFBRTtZQUNMLGVBQWUsRUFBRSxRQUFRLEdBQUcsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLE1BQU0sRUFBRSxDQUFDO1lBQ3BELGNBQWMsRUFBRSxtQ0FBbUM7U0FDdEQ7UUFDRCxJQUFJLEVBQUUsK0JBQStCO0tBQ3hDLENBQUMsQ0FBQTtJQUVGLElBQUksUUFBUSxDQUFDLE1BQU0sSUFBSSxHQUFHLElBQUksUUFBUSxDQUFDLE1BQU0sSUFBSSxHQUFHLEVBQUU7UUFDbEQsR0FBRyxDQUFDLGlDQUFpQyxDQUFDLENBQUE7UUFDdEMsTUFBTSxJQUFJLEdBQUcsTUFBTSxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUE7UUFDbEMsT0FBTztZQUNILE1BQU07WUFDTixNQUFNO1lBQ04sS0FBSyxFQUFFLElBQUksQ0FBQyxZQUFZO1lBQ3hCLGVBQWUsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFO1lBQzNCLGNBQWMsRUFBRSxJQUFJLENBQUMsVUFBVTtTQUNsQyxDQUFBO0tBQ0o7U0FBTTtRQUNILEtBQUssQ0FBQyxhQUFhLEVBQUUsUUFBUSxDQUFDLENBQUE7UUFDOUIsT0FBTyxLQUFLLENBQUE7S0FDZjtBQUNMLENBQUM7QUFFRCxlQUFlO0lBQ1gsSUFBSTtDQUNQLENBQUEifQ==