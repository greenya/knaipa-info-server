import { Node } from "./vendor/https/deno.land/x/router/mod.ts";
import { hasTrailingSlash, NotFoundHandler } from "./util.ts";
export class Router {
    trees = {};
    add(method, path, h) {
        if (path[0] !== "/") {
            path = `/${path}`;
        }
        if (hasTrailingSlash(path)) {
            path = path.slice(0, path.length - 1);
        }
        let root = this.trees[method];
        if (!root) {
            root = new Node();
            this.trees[method] = root;
        }
        root.add(path, h);
    }
    find(method, c) {
        const node = this.trees[method];
        let path = c.path;
        if (hasTrailingSlash(path)) {
            path = path.slice(0, path.length - 1);
        }
        let h;
        if (node) {
            const [handle, params] = node.find(path);
            if (params) {
                for (const [k, v] of params) {
                    c.params[k] = v;
                }
            }
            if (handle) {
                h = handle;
            }
        }
        return h ?? NotFoundHandler;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicm91dGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUdBLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQUNoRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsZUFBZSxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBRTlELE1BQU0sT0FBTyxNQUFNO0lBQ2pCLEtBQUssR0FBeUIsRUFBRSxDQUFDO0lBRWpDLEdBQUcsQ0FBQyxNQUFjLEVBQUUsSUFBWSxFQUFFLENBQWM7UUFDOUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxFQUFFO1lBQ25CLElBQUksR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1NBQ25CO1FBRUQsSUFBSSxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUMxQixJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztTQUN2QztRQUVELElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDOUIsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNULElBQUksR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1lBQ2xCLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDO1NBQzNCO1FBRUQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDcEIsQ0FBQztJQUVELElBQUksQ0FBQyxNQUFjLEVBQUUsQ0FBVTtRQUM3QixNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2hDLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDbEIsSUFBSSxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUMxQixJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztTQUN2QztRQUNELElBQUksQ0FBMEIsQ0FBQztRQUMvQixJQUFJLElBQUksRUFBRTtZQUNSLE1BQU0sQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN6QyxJQUFJLE1BQU0sRUFBRTtnQkFDVixLQUFLLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksTUFBTSxFQUFFO29CQUMzQixDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztpQkFDakI7YUFDRjtZQUVELElBQUksTUFBTSxFQUFFO2dCQUNWLENBQUMsR0FBRyxNQUFxQixDQUFDO2FBQzNCO1NBQ0Y7UUFFRCxPQUFPLENBQUMsSUFBSSxlQUFlLENBQUM7SUFDOUIsQ0FBQztDQUNGIn0=