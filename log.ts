export class Log {

    private prefix: string

    constructor(prefix: string) {
        this.prefix = `[${prefix}]`
    }

    // deno-lint-ignore no-explicit-any
    public log(message: string, ...args: any[]) {
        console.log(this.prefix, message, ...args)
    }

    // deno-lint-ignore no-explicit-any
    public error(message: string, ...args: any[]) {
        console.error(this.prefix, message, ...args)
        return new Error(message)
    }

}
