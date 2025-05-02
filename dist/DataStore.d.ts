export declare class DataStore {
    readonly filePath: string;
    readonly cache?: boolean;
    readonly initialData?: string;
    private memoryCache?;
    constructor(filePath: string, options?: {
        cache?: boolean;
        initialData?: string;
    });
    private ensureDirectoryExistence;
    write(data: string): Promise<void>;
    read(): Promise<string | null>;
    delete(): Promise<void>;
    clearCache(): void;
}
