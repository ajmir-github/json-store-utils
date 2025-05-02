import { DataStore } from "./DataStore";
import { createEncrypter } from "./createEncrypter";

export class EncryptedStore {
  private readonly store: DataStore;
  private readonly encrypter: ReturnType<typeof createEncrypter>;

  constructor(
    filePath: string,
    password: string,
    salt: string,
    options?: { cache?: boolean }
  ) {
    this.encrypter = createEncrypter(password, salt);
    this.store = new DataStore(filePath, options);
  }

  async write(data: string): Promise<void> {
    await this.store.write(this.encrypter.encrypt(data));
  }

  async read(): Promise<string | null> {
    const encrypted = await this.store.read();
    if (!encrypted) return null;
    try {
      return this.encrypter.decrypt(encrypted);
    } catch (e) {
      console.error("Decryption failed:", e);
      return null;
    }
  }

  async delete(): Promise<void> {
    await this.store.delete();
  }

  clearCache() {
    this.store.clearCache();
  }
}
