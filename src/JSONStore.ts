import { DataStore } from "./DataStore";

export class JSONStore<Data> {
  private store: DataStore;

  constructor(
    filePath: string,
    options: { cache?: boolean; initialData?: Data } = {}
  ) {
    const initialData = options.initialData
      ? JSON.stringify(options.initialData)
      : undefined;

    this.store = new DataStore(filePath, {
      cache: options.cache,
      initialData,
    });
  }

  async write(data: Data): Promise<void> {
    await this.store.write(JSON.stringify(data));
  }

  async read(): Promise<Data | null> {
    const raw = await this.store.read();
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch (e) {
      console.error("Failed to parse JSON:", e);
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
