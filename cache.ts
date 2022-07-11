import { Buffer } from './buffer.ts'
import { Log } from './log.ts'
import { Store } from './store.ts'

interface RecordConfig {
    /**
     * -1 for "never expire"
     */
    expMinutes: number,
    /**
     * 0 for "exect" expMinutes value
     */
    expFuzzyPercent: number
}

const recordConfigDefault: RecordConfig = {
    expMinutes: 60,
    expFuzzyPercent: .5
}

interface Record {
    key: string,
    exp: number,
    conf: RecordConfig,
    update: () => Promise<unknown> | unknown,
    data?: unknown,
    error?: Error
}

export class Cache {

    private log = new Log('cache')
    private store = new Store()
    private records: Map<string, Record> = new Map()
    private autoUpdateTimeoutId = 0
    private updaterLog = new Buffer<string>(100)

    has(key: string) {
        return this.records.has(key)
    }

    add(key: string, update: () => Promise<unknown> | unknown, partialConf: Partial<RecordConfig> = {}) {
        if (this.records.has(key)) {
            throw this.log.error(`Failed to add duplicated "${key}"`)
        } else {
            const conf = Object.assign({}, recordConfigDefault, partialConf)
            const exp = conf.expMinutes == -1 ? -1 : 0
            this.records.set(key, { key, exp, conf, update })
        }
    }

    get<T>(key: string): T | undefined {
        if (this.records.has(key)) {
            const record = this.records.get(key)!
            return <T> record.data
        } else {
            throw this.log.error(`Failed to get unknown "${key}"`)
        }
    }

    reset(key: string) {
        if (this.records.has(key)) {
            const record = this.records.get(key)!
            record.data = undefined
            record.error = undefined
            if (record.exp >= 0) {
                record.exp = 0
            }
        } else {
            throw this.log.error(`Failed to reset unknown "${key}"`)
        }
    }

    async update(key: string) {
        if (this.records.has(key)) {
            const record = this.records.get(key)!

            let result = undefined
            try {
                result = await record.update()
            } catch (e) {
                result = e
            }

            await this.set(record, result)
        }
    }

    async load() {
        const keys = Array.from(this.records.keys())
        const storeKeys = await this.store.keys()

        while (keys.length > 0) {
            this.log.log(`Load keys, ${keys.length} left...`)
            const keysToLoad = keys.splice(0, 100).filter(k => storeKeys.includes(k))
            const map = await this.store.getMap(keysToLoad)
            for (const key of keysToLoad) {
                const record = this.records.get(key)!
                const value = JSON.parse(map.get(key)!)
                await this.set(record, value, true)
            }
        }

        this.log.log('Load complete')
    }

    live() {
        this.autoUpdateEnable()
    }

    die() {
        this.autoUpdateDisable()
    }

    info() {
        let pending = 0
        const total = this.records.size
        const now = Date.now()
        this.records.forEach(r => pending += this.updateNeeded(r, now) ? 1 : 0)

        return {
            hot: (total - pending) / total,
            keys: this.records.size,
            live: this.autoUpdateTimeoutId > 0,
            token: Deno.env.get('REPLIT_DB_URL'),
            log: this.updaterLog.list()
        }
    }

    private async set(record: Record, value: unknown, skipStoreSet = false) {
        if (value instanceof Error) {
            this.log.log(value.toString())
            this.updaterLog.add(`[set] ${value.message}`)
            record.error = value
        } else {
            record.error = undefined
            const oldString = JSON.stringify(record.data)
            const newString = JSON.stringify(value)
            if (oldString != newString) {
                record.data = value
                if (!skipStoreSet) {
                    this.log.log(`Save ${record.key}`)
                    await this.store.set(record.key, newString)
                }
            }
        }

        this.updateExp(record)
    }

    private updateNeeded(record: Record, now = Date.now()) {
        return (record.exp >= 0 && record.exp < now)
            || (record.conf.expMinutes == -1 && (!record.data || record.error))
    }

    private updateExp(record: Record, now = Date.now()) {
        if (record.conf.expMinutes == -1) {
            if (record.error) {
                // TODO: if happens, come up with some proper logic (maybe get rid of "never expire" thing completely)
                const msg = '[SHOULD NEVER HAPPEN] Failed to update "never expire" record! Going to try again in 30 sec'
                this.log.log(msg)
                this.updaterLog.add(msg)
                record.exp = now + 30 * 1000
            }
        } else if (record.conf.expMinutes >= 0) {
            let exp = record.conf.expMinutes
            exp *= 60 * 1000
            const fuzzy = exp * record.conf.expFuzzyPercent
            exp -= Math.ceil(fuzzy * Math.random() - fuzzy / 2)
            record.exp = exp + now
        }
    }

    private autoUpdateEnable() {
        if (!this.autoUpdateTimeoutId) {
            this.log.log('Auto update enabled')
            this.autoUpdateTimeoutId = this.autoUpdateNextTimeout()
        }
    }

    private autoUpdateDisable() {
        if (this.autoUpdateTimeoutId > 0) {
            this.log.log('Auto update disabled')
            clearTimeout(this.autoUpdateTimeoutId)
            this.autoUpdateTimeoutId = 0
        }
    }

    private autoUpdateNextTimeout() {
        return setTimeout(async () => {
            try {
                await this.autoUpdater()
            } catch (e) {
                this.updaterLog.add(`[autoUpdateNextTimeout] ${e.message}`)
            }
        }, 5 * 1000)
    }

    private async autoUpdater() {
        const keys: string[] = []
        const now = Date.now()

        this.records.forEach((record, key) => {
            if (keys.length < 10 && this.updateNeeded(record, now)) {
                keys.push(key)
            }
        })

        if (keys.length > 0) {
            this.log.log('Auto update:', keys.join(', '))
            for (let i = 0; i < keys.length; i++) {
                await this.update(keys[i])
            }
        }

        if (this.autoUpdateTimeoutId > 0) {
            this.autoUpdateTimeoutId = this.autoUpdateNextTimeout()
        }
    }

}
