

export interface IVideo {
    _id: string;
    name: string;
    description: string;
    videoPath: string;
    picturePath: string;
    comments: string[];
    tags: string[];
    user: string | IUser;
    viewCount: number;
    likeCount: number;
}


export interface IVideoUserState {
    videos: IVideo[],
    loading: boolean | null;
    error: boolean | null;
}


export interface IVideoData {
    name: string,
    description: string,
    video: any,
    picture: any,
    user: string,
    tags: string
}