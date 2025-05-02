import { DataStore } from "./DataStore";
import { createEncrypter } from "./createEncrypter";
export class EncryptedJSONStore {
    constructor(filePath, password, salt, options = {}) {
        this.encrypter = createEncrypter(password, salt);
        const initialData = options.initialData
            ? this.encrypter.encrypt(JSON.stringify(options.initialData))
            : undefined;
        this.store = new DataStore(filePath, {
            cache: options.cache,
            initialData,
        });
    }
    async write(data) {
        await this.store.write(this.encrypter.encrypt(JSON.stringify(data)));
    }
    async read() {
        const encrypted = await this.store.read();
        if (!encrypted)
            return null;
        try {
            return JSON.parse(this.encrypter.decrypt(encrypted));
        }
        catch (e) {
            console.error("Failed to decrypt or parse JSON:", e);
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
