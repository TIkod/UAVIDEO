import { Video } from "src/video/schemas/video.schema";

export interface User {
    name: string;
    email: string;
    password: string;
    videos: Video[];
    tags: string[];
    role: string
}