import { DataStore } from "./DataStore";
import { createEncrypter } from "./createEncrypter";

export class EncryptedJSONStore<Data> {
  private readonly store: DataStore;
  private readonly encrypter: ReturnType<typeof createEncrypter>;

  constructor(
    filePath: string,
    password: string,
    salt: string,
    options: { cache?: boolean; initialData?: Data } = {}
  ) {
    this.encrypter = createEncrypter(password, salt);
    const initialData = options.initialData
      ? this.encrypter.encrypt(JSON.stringify(options.initialData))
      : undefined;

    this.store = new DataStore(filePath, {
      cache: options.cache,
      initialData,
    });
  }

  async write(data: Data): Promise<void> {
    await this.store.write(this.encrypter.encrypt(JSON.stringify(data)));
  }

  async read(): Promise<Data | null> {
    const encrypted = await this.store.read();
    if (!encrypted) return null;
    try {
      return JSON.parse(this.encrypter.decrypt(encrypted));
    } catch (e) {
      console.error("Failed to decrypt or parse JSON:", e);
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
