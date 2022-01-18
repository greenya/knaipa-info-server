import { extname } from "./vendor/https/deno.land/std/path/mod.ts";
import { MIME } from "./constants.ts";
import { NotFoundException } from "./http_exception.ts";
export function contentType(filepath) {
    return MIME.DB[extname(filepath)];
}
export function hasTrailingSlash(str) {
    if (str.length > 1 && str[str.length - 1] === "/") {
        return true;
    }
    return false;
}
export function NotFoundHandler() {
    throw new NotFoundException();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInV0aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBQ25FLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN0QyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUd4RCxNQUFNLFVBQVUsV0FBVyxDQUFDLFFBQWdCO0lBQzFDLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztBQUNwQyxDQUFDO0FBRUQsTUFBTSxVQUFVLGdCQUFnQixDQUFDLEdBQVc7SUFDMUMsSUFBSSxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsS0FBSyxHQUFHLEVBQUU7UUFDakQsT0FBTyxJQUFJLENBQUM7S0FDYjtJQUVELE9BQU8sS0FBSyxDQUFDO0FBQ2YsQ0FBQztBQUVELE1BQU0sVUFBVSxlQUFlO0lBQzdCLE1BQU0sSUFBSSxpQkFBaUIsRUFBRSxDQUFDO0FBQ2hDLENBQUMifQ==