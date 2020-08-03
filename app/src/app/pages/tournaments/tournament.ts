export interface Tournament {
    _id: string;
    createdAt: Date;
    ownerId: string;
    name: string;
    size: number;
    participants: {username: string, id: string}[];
    organizer: {username: string, id: string};
}