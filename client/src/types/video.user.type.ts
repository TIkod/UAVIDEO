


export interface IVideo {
    id: string;
    name: string;
    description: string;
    videoPath: string;
    picturePath: string;
    comments: string[];
    user: string;
}

export interface IVideoUserState {
    videos: IVideo[],
    loading: boolean | null;
    error: boolean | null;
}

export interface IVideoData {
    name: string,
    description: string,
    video: object,
    picture: object,
    user: string,
}