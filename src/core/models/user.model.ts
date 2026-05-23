export interface User {
    token: string;
    refreshToken: string;
    refreshTokenExpiration: Date;
    message: string;
}