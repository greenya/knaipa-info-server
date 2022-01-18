import { equals, indexOf, lastIndexOf, startsWith } from "../bytes/mod.ts";
import { copyN } from "../io/ioutil.ts";
import { MultiReader } from "../io/readers.ts";
import { extname } from "../path/mod.ts";
import { BufReader, BufWriter } from "../io/bufio.ts";
import { assert } from "../_util/assert.ts";
import { TextProtoReader } from "../textproto/mod.ts";
import { hasOwnProperty } from "../_util/has_own_property.ts";
import { Buffer } from "../io/buffer.ts";
export function isFormFile(x) {
    return hasOwnProperty(x, "filename") && hasOwnProperty(x, "type");
}
function randomBoundary() {
    let boundary = "--------------------------";
    for (let i = 0; i < 24; i++) {
        boundary += Math.floor(Math.random() * 16).toString(16);
    }
    return boundary;
}
const encoder = new TextEncoder();
export function matchAfterPrefix(buf, prefix, eof) {
    if (buf.length === prefix.length) {
        return eof ? 1 : 0;
    }
    const c = buf[prefix.length];
    if (c === " ".charCodeAt(0) ||
        c === "\t".charCodeAt(0) ||
        c === "\r".charCodeAt(0) ||
        c === "\n".charCodeAt(0) ||
        c === "-".charCodeAt(0)) {
        return 1;
    }
    return -1;
}
export function scanUntilBoundary(buf, dashBoundary, newLineDashBoundary, total, eof) {
    if (total === 0) {
        if (startsWith(buf, dashBoundary)) {
            switch (matchAfterPrefix(buf, dashBoundary, eof)) {
                case -1:
                    return dashBoundary.length;
                case 0:
                    return 0;
                case 1:
                    return null;
            }
        }
        if (startsWith(dashBoundary, buf)) {
            return 0;
        }
    }
    const i = indexOf(buf, newLineDashBoundary);
    if (i >= 0) {
        switch (matchAfterPrefix(buf.slice(i), newLineDashBoundary, eof)) {
            case -1:
                return i + newLineDashBoundary.length;
            case 0:
                return i;
            case 1:
                return i > 0 ? i : null;
        }
    }
    if (startsWith(newLineDashBoundary, buf)) {
        return 0;
    }
    const j = lastIndexOf(buf, newLineDashBoundary.slice(0, 1));
    if (j >= 0 && startsWith(newLineDashBoundary, buf.slice(j))) {
        return j;
    }
    return buf.length;
}
class PartReader {
    mr;
    headers;
    n = 0;
    total = 0;
    constructor(mr, headers) {
        this.mr = mr;
        this.headers = headers;
    }
    async read(p) {
        const br = this.mr.bufReader;
        let peekLength = 1;
        while (this.n === 0) {
            peekLength = Math.max(peekLength, br.buffered());
            const peekBuf = await br.peek(peekLength);
            if (peekBuf === null) {
                throw new Deno.errors.UnexpectedEof();
            }
            const eof = peekBuf.length < peekLength;
            this.n = scanUntilBoundary(peekBuf, this.mr.dashBoundary, this.mr.newLineDashBoundary, this.total, eof);
            if (this.n === 0) {
                assert(eof === false);
                peekLength++;
            }
        }
        if (this.n === null) {
            return null;
        }
        const nread = Math.min(p.length, this.n);
        const buf = p.subarray(0, nread);
        const r = await br.readFull(buf);
        assert(r === buf);
        this.n -= nread;
        this.total += nread;
        return nread;
    }
    close() { }
    contentDisposition;
    contentDispositionParams;
    getContentDispositionParams() {
        if (this.contentDispositionParams)
            return this.contentDispositionParams;
        const cd = this.headers.get("content-disposition");
        const params = {};
        assert(cd != null, "content-disposition must be set");
        const comps = decodeURI(cd).split(";");
        this.contentDisposition = comps[0];
        comps
            .slice(1)
            .map((v) => v.trim())
            .map((kv) => {
            const [k, v] = kv.split("=");
            if (v) {
                const s = v.charAt(0);
                const e = v.charAt(v.length - 1);
                if ((s === e && s === '"') || s === "'") {
                    params[k] = v.substr(1, v.length - 2);
                }
                else {
                    params[k] = v;
                }
            }
        });
        return (this.contentDispositionParams = params);
    }
    get fileName() {
        return this.getContentDispositionParams()["filename"];
    }
    get formName() {
        const p = this.getContentDispositionParams();
        if (this.contentDisposition === "form-data") {
            return p["name"];
        }
        return "";
    }
}
function skipLWSPChar(u) {
    const ret = new Uint8Array(u.length);
    const sp = " ".charCodeAt(0);
    const ht = "\t".charCodeAt(0);
    let j = 0;
    for (let i = 0; i < u.length; i++) {
        if (u[i] === sp || u[i] === ht)
            continue;
        ret[j++] = u[i];
    }
    return ret.slice(0, j);
}
export class MultipartReader {
    boundary;
    newLine;
    newLineDashBoundary;
    dashBoundaryDash;
    dashBoundary;
    bufReader;
    constructor(reader, boundary) {
        this.boundary = boundary;
        this.newLine = encoder.encode("\r\n");
        this.newLineDashBoundary = encoder.encode(`\r\n--${boundary}`);
        this.dashBoundaryDash = encoder.encode(`--${this.boundary}--`);
        this.dashBoundary = encoder.encode(`--${this.boundary}`);
        this.bufReader = new BufReader(reader);
    }
    async readForm(maxMemoryOrOptions) {
        const options = typeof maxMemoryOrOptions === "number"
            ? { maxMemory: maxMemoryOrOptions }
            : maxMemoryOrOptions;
        let maxMemory = options?.maxMemory ?? 10 << 20;
        const fileMap = new Map();
        const valueMap = new Map();
        let maxValueBytes = maxMemory + (10 << 20);
        const buf = new Buffer(new Uint8Array(maxValueBytes));
        for (;;) {
            const p = await this.nextPart();
            if (p === null) {
                break;
            }
            if (p.formName === "") {
                continue;
            }
            buf.reset();
            if (!p.fileName) {
                const n = await copyN(p, buf, maxValueBytes);
                maxValueBytes -= n;
                if (maxValueBytes < 0) {
                    throw new RangeError("message too large");
                }
                const value = new TextDecoder().decode(buf.bytes());
                valueMap.set(p.formName, value);
                continue;
            }
            let formFile;
            const n = await copyN(p, buf, maxValueBytes);
            const contentType = p.headers.get("content-type");
            assert(contentType != null, "content-type must be set");
            if (n > maxMemory) {
                const ext = extname(p.fileName);
                const filepath = await Deno.makeTempFile({
                    dir: options?.dir ?? ".",
                    prefix: options?.prefix ?? "multipart-",
                    suffix: options?.suffix ?? ext,
                });
                const file = await Deno.open(filepath, { write: true });
                try {
                    const size = await Deno.copy(new MultiReader(buf, p), file);
                    file.close();
                    formFile = {
                        filename: p.fileName,
                        type: contentType,
                        tempfile: filepath,
                        size,
                    };
                }
                catch (e) {
                    await Deno.remove(filepath);
                    throw e;
                }
            }
            else {
                formFile = {
                    filename: p.fileName,
                    type: contentType,
                    content: buf.bytes(),
                    size: buf.length,
                };
                maxMemory -= n;
                maxValueBytes -= n;
            }
            if (formFile) {
                const mapVal = fileMap.get(p.formName);
                if (mapVal !== undefined) {
                    if (Array.isArray(mapVal)) {
                        mapVal.push(formFile);
                    }
                    else {
                        fileMap.set(p.formName, [mapVal, formFile]);
                    }
                }
                else {
                    fileMap.set(p.formName, formFile);
                }
            }
        }
        return multipartFormData(fileMap, valueMap);
    }
    currentPart;
    partsRead = 0;
    async nextPart() {
        if (this.currentPart) {
            this.currentPart.close();
        }
        if (equals(this.dashBoundary, encoder.encode("--"))) {
            throw new Error("boundary is empty");
        }
        let expectNewPart = false;
        for (;;) {
            const line = await this.bufReader.readSlice("\n".charCodeAt(0));
            if (line === null) {
                throw new Deno.errors.UnexpectedEof();
            }
            if (this.isBoundaryDelimiterLine(line)) {
                this.partsRead++;
                const r = new TextProtoReader(this.bufReader);
                const headers = await r.readMIMEHeader();
                if (headers === null) {
                    throw new Deno.errors.UnexpectedEof();
                }
                const np = new PartReader(this, headers);
                this.currentPart = np;
                return np;
            }
            if (this.isFinalBoundary(line)) {
                return null;
            }
            if (expectNewPart) {
                throw new Error(`expecting a new Part; got line ${line}`);
            }
            if (this.partsRead === 0) {
                continue;
            }
            if (equals(line, this.newLine)) {
                expectNewPart = true;
                continue;
            }
            throw new Error(`unexpected line in nextPart(): ${line}`);
        }
    }
    isFinalBoundary(line) {
        if (!startsWith(line, this.dashBoundaryDash)) {
            return false;
        }
        const rest = line.slice(this.dashBoundaryDash.length, line.length);
        return rest.length === 0 || equals(skipLWSPChar(rest), this.newLine);
    }
    isBoundaryDelimiterLine(line) {
        if (!startsWith(line, this.dashBoundary)) {
            return false;
        }
        const rest = line.slice(this.dashBoundary.length);
        return equals(skipLWSPChar(rest), this.newLine);
    }
}
function multipartFormData(fileMap, valueMap) {
    function file(key) {
        return fileMap.get(key);
    }
    function value(key) {
        return valueMap.get(key);
    }
    function* entries() {
        yield* fileMap;
        yield* valueMap;
    }
    async function removeAll() {
        const promises = [];
        for (const val of fileMap.values()) {
            if (Array.isArray(val)) {
                for (const subVal of val) {
                    if (!subVal.tempfile)
                        continue;
                    promises.push(Deno.remove(subVal.tempfile));
                }
            }
            else {
                if (!val.tempfile)
                    continue;
                promises.push(Deno.remove(val.tempfile));
            }
        }
        await Promise.all(promises);
    }
    return {
        file,
        value,
        entries,
        removeAll,
        [Symbol.iterator]() {
            return entries();
        },
    };
}
class PartWriter {
    writer;
    boundary;
    headers;
    closed = false;
    partHeader;
    headersWritten = false;
    constructor(writer, boundary, headers, isFirstBoundary) {
        this.writer = writer;
        this.boundary = boundary;
        this.headers = headers;
        let buf = "";
        if (isFirstBoundary) {
            buf += `--${boundary}\r\n`;
        }
        else {
            buf += `\r\n--${boundary}\r\n`;
        }
        for (const [key, value] of headers.entries()) {
            buf += `${key}: ${value}\r\n`;
        }
        buf += `\r\n`;
        this.partHeader = buf;
    }
    close() {
        this.closed = true;
    }
    async write(p) {
        if (this.closed) {
            throw new Error("part is closed");
        }
        if (!this.headersWritten) {
            await this.writer.write(encoder.encode(this.partHeader));
            this.headersWritten = true;
        }
        return this.writer.write(p);
    }
}
function checkBoundary(b) {
    if (b.length < 1 || b.length > 70) {
        throw new Error(`invalid boundary length: ${b.length}`);
    }
    const end = b.length - 1;
    for (let i = 0; i < end; i++) {
        const c = b.charAt(i);
        if (!c.match(/[a-zA-Z0-9'()+_,\-./:=?]/) || (c === " " && i !== end)) {
            throw new Error("invalid boundary character: " + c);
        }
    }
    return b;
}
export class MultipartWriter {
    writer;
    _boundary;
    get boundary() {
        return this._boundary;
    }
    lastPart;
    bufWriter;
    isClosed = false;
    constructor(writer, boundary) {
        this.writer = writer;
        if (boundary !== void 0) {
            this._boundary = checkBoundary(boundary);
        }
        else {
            this._boundary = randomBoundary();
        }
        this.bufWriter = new BufWriter(writer);
    }
    formDataContentType() {
        return `multipart/form-data; boundary=${this.boundary}`;
    }
    createPart(headers) {
        if (this.isClosed) {
            throw new Error("multipart: writer is closed");
        }
        if (this.lastPart) {
            this.lastPart.close();
        }
        const part = new PartWriter(this.writer, this.boundary, headers, !this.lastPart);
        this.lastPart = part;
        return part;
    }
    createFormFile(field, filename) {
        const h = new Headers();
        h.set("Content-Disposition", `form-data; name="${field}"; filename="${filename}"`);
        h.set("Content-Type", "application/octet-stream");
        return this.createPart(h);
    }
    createFormField(field) {
        const h = new Headers();
        h.set("Content-Disposition", `form-data; name="${field}"`);
        h.set("Content-Type", "application/octet-stream");
        return this.createPart(h);
    }
    async writeField(field, value) {
        const f = await this.createFormField(field);
        await f.write(encoder.encode(value));
    }
    async writeFile(field, filename, file) {
        const f = await this.createFormFile(field, filename);
        await Deno.copy(file, f);
    }
    flush() {
        return this.bufWriter.flush();
    }
    async close() {
        if (this.isClosed) {
            throw new Error("multipart: writer is closed");
        }
        if (this.lastPart) {
            this.lastPart.close();
            this.lastPart = void 0;
        }
        await this.writer.write(encoder.encode(`\r\n--${this.boundary}--\r\n`));
        await this.flush();
        this.isClosed = true;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXVsdGlwYXJ0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibXVsdGlwYXJ0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDeEMsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6QyxPQUFPLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUM1QyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdEQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQzlELE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQW9CekMsTUFBTSxVQUFVLFVBQVUsQ0FBQyxDQUFNO0lBQy9CLE9BQU8sY0FBYyxDQUFDLENBQUMsRUFBRSxVQUFVLENBQUMsSUFBSSxjQUFjLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQ3BFLENBQUM7QUFFRCxTQUFTLGNBQWM7SUFDckIsSUFBSSxRQUFRLEdBQUcsNEJBQTRCLENBQUM7SUFDNUMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUMzQixRQUFRLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0tBQ3pEO0lBQ0QsT0FBTyxRQUFRLENBQUM7QUFD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