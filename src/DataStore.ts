import fs from "fs/promises";
import path from "path";

export class DataStore {
  readonly filePath: string;
  readonly cache?: boolean;
  readonly initialData?: string;
  private memoryCache?: string;

  constructor(
    filePath: string,
    options: { cache?: boolean; initialData?: string } = {}
  ) {
    this.filePath = filePath;
    this.cache = options.cache;
    this.initialData = options.initialData;
  }

  private async ensureDirectoryExistence() {
    const dir = path.dirname(this.filePath);
    try {
      await fs.access(dir);
    } catch {
      await fs.mkdir(dir, { recursive: true });
    }
  }

  async write(data: string): Promise<void> {
    await this.ensureDirectoryExistence();
    await fs.writeFile(this.filePath, data, "utf8");
    if (this.cache) this.memoryCache = data;
  }

  async read(): Promise<string | null> {
    if (this.cache && this.memoryCache !== undefined) return this.memoryCache;
    try {
      const data = await fs.readFile(this.filePath, "utf8");
      if (this.cache) this.memoryCache = data;
      return data;
    } catch (e: any) {
      if (e.code === "ENOENT" && this.initialData !== undefined) {
        await this.write(this.initialData);
        return this.read();
      }
      throw e;
    }
  }

  async delete(): Promise<void> {
    try {
      await fs.unlink(this.filePath);
    } catch (e: any) {
      if (e.code !== "ENOENT") throw e;
    }
    if (this.cache) this.memoryCache = undefined;
  }

  clearCache() {
    this.memoryCache = undefined;
  }
}
