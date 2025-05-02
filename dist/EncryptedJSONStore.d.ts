export declare class EncryptedJSONStore<Data> {
    private readonly store;
    private readonly encrypter;
    constructor(filePath: string, password: string, salt: string, options?: {
        cache?: boolean;
        initialData?: Data;
    });
    write(data: Data): Promise<void>;
    read(): Promise<Data | null>;
    delete(): Promise<void>;
    clearCache(): void;
}
