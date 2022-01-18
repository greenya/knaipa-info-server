import { Log } from './log.ts'

// docs: https://docs.replit.com/misc/database

export class Store {

    private log = new Log('store')
    private url: string

    constructor(url: string = '') {
        this.url = url || Deno.env.get('REPLIT_DB_URL')!
        if (!this.url) {
            throw this.log.error('Failed to resolve Replit database url')
        }
    }

    async get(key: string) {
        const response = await this.fetch(`${this.url}/${encodeURIComponent(key)}`)

        if (response.ok) {
            return await response.text()
        } else {
            throw this.log.error(`Failed to get "${key}":`, response.statusText)
        }
    }

    async set(key: string, value: string) {
        const response = await this.fetch(this.url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: encodeURIComponent(key) + '=' + encodeURIComponent(value),
        })

        if (!response.ok) {
            throw this.log.error(`Failed to set "${key}":`, response.statusText)
        }
    }

    async drop(key: string | string[]) {
        const keys = typeof key == 'string' ? [ key ] : key
        const responses = await Promise.all(
            keys.map(k => this.fetch(`${this.url}/${encodeURIComponent(k)}`, { method: 'DELETE' }))
        )
        keys.forEach((k, i) => {
            const r = responses[i]
            if (!r.ok) {
                throw this.log.error(`Failed to drop "${k}":`, r.statusText)
            }
        })
    }

    async keys(keyPrefix = '') {
        const response = await this.fetch(`${this.url}?prefix=${encodeURIComponent(keyPrefix)}`)
        if (response.ok) {
            const text = await response.text()
            return text ? text.split('\n') : []
        } else {
            throw this.log.error(`Failed to list keys for key prefix "${keyPrefix}":`, response.statusText)
        }
    }

    async getMap(keys: string[]) {
        const map = new Map<string, string>()
        const val = await Promise.all(keys.map(k => this.get(k)))
        keys.map((k, i) => map.set(k, val[i]!))
        return map
    }

    async setMap(map: Map<string, string>) {
        const keys = Array.from(map.keys())
        await Promise.all(keys.map(k => this.set(k, map.get(k)!)))
    }

    private async fetch(input: Request | URL | string, init?: RequestInit) {
        const maxTries = 5
        const retryTimeout = 5000

        for (let t = 1; t <= maxTries; t++) {
            try {
                return await fetch(input, init)
            } catch (e) {
                this.log.log(`Failed to fetch, try ${t}/${maxTries}.`, e)
                this.log.log(`Retrying in ${retryTimeout} ms...`)
                await this.sleep(retryTimeout)
            }
        }

        throw this.log.error('FAILURE. Out of retries.')
    }

    private async sleep(ms: number) {
        await new Promise(r => setTimeout(r, ms))
    }

}
