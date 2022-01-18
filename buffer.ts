export class Buffer<T> {

    private items: T[]
    private cursor: number

    constructor(limit: number) {
        this.items = new Array(limit)
        this.cursor = 0
    }

    add(item: T) {
        this.items[this.cursor++] = item
        if (this.cursor >= this.items.length) {
            this.cursor = 0
        }
    }

    list() : T[] {
        return [
            ...this.items.slice(this.cursor).filter(e => e !== undefined),
            ...this.items.slice(0, this.cursor).filter(e => e !== undefined)
        ]
    }

}
