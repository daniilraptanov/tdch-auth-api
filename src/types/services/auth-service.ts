export interface IAuthService {
    checkPasswordHash(email: string, password: string): Promise<boolean>;
    hashedPassword(password: string): Promise<string>;
    createToken(userId: string): string;
}
