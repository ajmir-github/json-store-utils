export declare class EncryptedStore {
    private readonly store;
    private readonly encrypter;
    constructor(filePath: string, password: string, salt: string, options?: {
        cache?: boolean;
    });
    write(data: string): Promise<void>;
    read(): Promise<string | null>;
    delete(): Promise<void>;
    clearCache(): void;
}
