import { User } from "../users/user-interface";

export interface Tournament {
    _id: string;
    createdAt: Date;
    organizer?: {username:string, id:string};
    participants?: User[];
    description?: string;
    game?: string;
    format?: string;
    name: string;
    size: number;
    startDate: Date
    status: string
}