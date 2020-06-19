export interface Credentials {
    username: string;
    password: string;
}

export interface JWTResponse {
    success: boolean;
    err: string;
    access_token: string;
    refresh_token: string;
    expiresAt: Date;
}