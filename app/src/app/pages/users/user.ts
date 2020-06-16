export interface User {
    _id?: string;
    password: string;
    username: string;
    email: string;
    birthdate: Date;
    register_date?: Date;
}