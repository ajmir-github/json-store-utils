import { DataStore } from "./DataStore";
import { createEncrypter } from "./createEncrypter";
export class EncryptedStore {
    constructor(filePath, password, salt, options) {
        this.encrypter = createEncrypter(password, salt);
        this.store = new DataStore(filePath, options);
    }
    async write(data) {
        await this.store.write(this.encrypter.encrypt(data));
    }
    async read() {
        const encrypted = await this.store.read();
        if (!encrypted)
            return null;
        try {
            return this.encrypter.decrypt(encrypted);
        }
        catch (e) {
            console.error("Decryption failed:", e);
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
