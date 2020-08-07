export interface Tournament {
    _id?: string;
    createdAt?: Date;
    name?: string;
    size?: number;
    description?: string;
    participants?: {username?: string, id?: string}[];
    game?: string;
    format?: string;
    organizer?: {username?: string, id?: string, role?: string};
    startDate?: Date;
    status?: string;
}