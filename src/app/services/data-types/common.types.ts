export interface Banner {
    targetId: number;
    url: string;
    imageUrl: string;
}

export interface HotTag {
    id: number;
    name: string;
    position: number;
}

export interface SongSheet {
    id: number;
    name: string;
    playCount: number;
    picUrl: string;
    tracks: Song[];
    trackIds: trackId[];

}

export interface trackId {
    id: number;
    uid: number;
}

export interface Singer {
    id: number;
    name: string;
    albumSize: number;
    picUrl: string;
}

export interface Song {
    id: number;
    name: string;
    url: string;
    ar: Singer[];
    al: {
        id: number;
        name: string;
        picUrl: string;
    };
    dt: number;
}

export interface SongUrl {
    id: number;
    url: string;
}
