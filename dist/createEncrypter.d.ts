export declare function createEncrypter(password: string, salt: string): {
    encrypt(data: string): string;
    decrypt(encrypted: string): string;
};
