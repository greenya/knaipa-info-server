import { Buffer } from './buffer.ts'
import { Log } from './log.ts'
import { Store } from './store.ts'

interface RecordConfig {
    expMinutes: number,
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
            const record: Record = { key, exp: 0, conf, update }
            this.updateExp(record)
            this.records.set(key, record)
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
            record.exp = 0
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
        return record.exp < now
    }

    private updateExp(record: Record, now = Date.now()) {
        let exp = record.conf.expMinutes
        exp *= 60 * 1000
        const fuzzy = exp * record.conf.expFuzzyPercent
        exp -= Math.ceil(fuzzy * Math.random() - fuzzy / 2)
        record.exp = exp + now
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
