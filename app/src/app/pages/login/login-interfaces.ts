export interface Credentials {
    username: string;
    password: string;
}

export interface JWTResponse {
    success: boolean;
    err: string;
    token: string;
}