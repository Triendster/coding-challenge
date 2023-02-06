export interface ArtistInfo {
    name: string;
    summary: string;
    listeners: number;
    plays: number;
    albums: Array<{name: string; playcount: number}>;
    tracks: Array<{name: string; playcount: number; listeners: number}>;
}