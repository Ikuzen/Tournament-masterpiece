export interface Tournament {
    _id: string;
    createdAt: Date;
    name: string;
    size: number;
    participants: {username: string, id: string}[];
    organizer: {username: string, id: string};
    startDate: Date;
    status: string;
}