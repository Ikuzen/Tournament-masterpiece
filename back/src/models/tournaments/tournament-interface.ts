export interface Tournament {
    _id: string;
    createdAt: Date;
    ownerId: string;
    name: string;
    size: number;
}