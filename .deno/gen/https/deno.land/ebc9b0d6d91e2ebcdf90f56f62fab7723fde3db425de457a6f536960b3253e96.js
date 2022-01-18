import { Status } from "./vendor/https/deno.land/std/http/http_status.ts";
import { join } from "./vendor/https/deno.land/std/path/mod.ts";
import { getCookies, setCookie, } from "./vendor/https/deno.land/std/http/cookie.ts";
import { MultipartReader } from "./vendor/https/deno.land/std/mime/multipart.ts";
import { Header, MIME } from "./constants.ts";
import { contentType, NotFoundHandler } from "./util.ts";
const { cwd, readFile, readAll } = Deno;
const encoder = new TextEncoder();
const decoder = new TextDecoder();
export class Context {
    constructor(optionsOrContext) {
        this.response = { headers: new Headers() };
        this.params = {};
        this.#writeContentType = (v) => {
            if (!this.response.headers.has(Header.ContentType)) {
                this.response.headers.set(Header.ContentType, v);
            }
        };
        this.#readBody = async () => {
            const contentType = this.request.headers.get(Header.ContentType);
            walk: {
                let data = {};
                if (contentType) {
                    if (contentType.includes(MIME.ApplicationJSON)) {
                        data = JSON.parse(decoder.decode(await readAll(this.request.body)));
                    }
                    else if (contentType.includes(MIME.ApplicationForm)) {
                        for (const [k, v] of new URLSearchParams(decoder.decode(await readAll(this.request.body)))) {
                            data[k] = v;
                        }
                    }
                    else if (contentType.includes(MIME.MultipartForm)) {
                        const match = contentType.match(/boundary=([^\s]+)/);
                        const boundary = match ? match[1] : undefined;
                        if (boundary) {
                            const mr = new MultipartReader(this.request.body, boundary);
                            const form = await mr.readForm();
                            for (const [k, v] of form.entries()) {
                                data[k] = v;
                            }
                        }
                    }
                    else {
                        break walk;
                    }
                }
                else {
                    break walk;
                }
                return data;
            }
            return decoder.decode(await readAll(this.request.body));
        };
        if (optionsOrContext instanceof Context) {
            Object.assign(this, optionsOrContext);
            this.customContext = this;
            return;
        }
        const opts = optionsOrContext;
        this.app = opts.app;
        this.request = opts.r;
        this.url = new URL(this.request.url, `http://0.0.0.0`);
    }
    #store;
    #body;
    get cookies() {
        return getCookies(this.request);
    }
    get path() {
        return this.url.pathname;
    }
    get method() {
        return this.request.method;
    }
    get queryParams() {
        const params = {};
        for (const [k, v] of this.url.searchParams) {
            params[k] = v;
        }
        return params;
    }
    get body() {
        return this.#body ?? (this.#body = this.#readBody());
    }
    get(key) {
        return this.#store?.get(key);
    }
    set(key, val) {
        if (this.#store === undefined) {
            this.#store = new Map();
        }
        this.#store.set(key, val);
    }
    #writeContentType;
    #readBody;
    string(v, code = Status.OK) {
        this.#writeContentType(MIME.TextPlainCharsetUTF8);
        this.response.status = code;
        this.response.body = encoder.encode(v);
    }
    json(v, code = Status.OK) {
        this.#writeContentType(MIME.ApplicationJSONCharsetUTF8);
        this.response.status = code;
        this.response.body = encoder.encode(typeof v === "object" ? JSON.stringify(v) : v);
    }
    html(v, code = Status.OK) {
        this.#writeContentType(MIME.TextHTMLCharsetUTF8);
        this.response.status = code;
        this.response.body = encoder.encode(v);
    }
    htmlBlob(b, code = Status.OK) {
        this.blob(b, MIME.TextHTMLCharsetUTF8, code);
    }
    async render(name, data = {}, code = Status.OK) {
        if (!this.app.renderer) {
            throw new Error();
        }
        const r = await this.app.renderer.render(name, data);
        this.htmlBlob(r, code);
    }
    blob(b, contentType, code = Status.OK) {
        if (contentType) {
            this.#writeContentType(contentType);
        }
        this.response.status = code;
        this.response.body = b;
    }
    async file(filepath) {
        filepath = join(cwd(), filepath);
        try {
            this.blob(await readFile(filepath), contentType(filepath));
        }
        catch {
            NotFoundHandler();
        }
    }
    setCookie(c) {
        setCookie(this.response, c);
    }
    redirect(url, code = Status.Found) {
        this.response.headers.set(Header.Location, url);
        this.response.status = code;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvbnRleHQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBUUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGtEQUFrRCxDQUFDO0FBQzFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQUNoRSxPQUFPLEVBQ0wsVUFBVSxFQUNWLFNBQVMsR0FDVixNQUFNLDZDQUE2QyxDQUFDO0FBQ3JELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxnREFBZ0QsQ0FBQztBQUNqRixPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzlDLE9BQU8sRUFBRSxXQUFXLEVBQUUsZUFBZSxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBRXpELE1BQU0sRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxHQUFHLElBQUksQ0FBQztBQUV4QyxNQUFNLE9BQU8sR0FBRyxJQUFJLFdBQVcsRUFBRSxDQUFDO0FBQ2xDLE1BQU0sT0FBTyxHQUFHLElBQUksV0FBVyxFQUFFLENBQUM7QUFFbEMsTUFBTSxPQUFPLE9BQU87SUFtRGxCLFlBQVksZ0JBQTBDO1FBOUN0RCxhQUFRLEdBQW9DLEVBQUUsT0FBTyxFQUFFLElBQUksT0FBTyxFQUFFLEVBQUUsQ0FBQztRQUN2RSxXQUFNLEdBQTJCLEVBQUUsQ0FBQztRQTJEcEMsc0JBQWlCLEdBQUcsQ0FBQyxDQUFTLEVBQVEsRUFBRTtZQUN0QyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsRUFBRTtnQkFDbEQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUM7YUFDbEQ7UUFDSCxDQUFDLENBQUM7UUFFRixjQUFTLEdBQUcsS0FBSyxJQUFzQixF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