import { DataStore } from "./DataStore";
export class JSONStore {
    constructor(filePath, options = {}) {
        const initialData = options.initialData
            ? JSON.stringify(options.initialData)
            : undefined;
        this.store = new DataStore(filePath, {
            cache: options.cache,
            initialData,
        });
    }
    async write(data) {
        await this.store.write(JSON.stringify(data));
    }
    async read() {
        const raw = await this.store.read();
        if (!raw)
            return null;
        try {
            return JSON.parse(raw);
        }
        catch (e) {
            console.error("Failed to parse JSON:", e);
            return null;
        }
    }
    async delete() {
        await this.store.delete();
    }
    clearCache() {
        this.store.clearCache();
    }
}
