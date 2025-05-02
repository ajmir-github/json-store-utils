export declare class JSONStore<Data> {
    private store;
    constructor(filePath: string, options?: {
        cache?: boolean;
        initialData?: Data;
    });
    write(data: Data): Promise<void>;
    read(): Promise<Data | null>;
    delete(): Promise<void>;
    clearCache(): void;
}
