export interface Tournament {
    _id?: string;
    createdAt?: Date;
    name?: string;
    size?: number;
    description?: string;
    participants?: {username?: string; id?: string; role?: string}[];
    game?: string;
    format?: string;
    organizer?: {username?: string; id?: string; role?: string};
    startDate?: Date;
    status?: string;
}

export interface TournamentPages {
    docs: Tournament[];
    totalDocs: number;
    offset: number;
    limit: number;
    totalPages: number;
    page: number;
    pagingCounter: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    prevPage: any;
    nextPage: any;
  }