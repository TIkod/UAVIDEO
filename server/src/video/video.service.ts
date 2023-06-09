import { BadRequestException, Injectable, ValidationError, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Video, VideoDocument } from './schemas/video.schema';
import { CreateVideoDto } from './dto/CreateVideoDto';
import { FileService, FileType } from 'src/file/file.service';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import * as fs from 'fs';
import * as path from 'path';
import { spawn } from 'child_process';
import { User } from 'src/user/schemas/user.schema';
import { UserService } from 'src/user/user.service';


@Injectable()
export class VideoService {
    constructor(
        @InjectModel(Video.name) private videoModel: Model<VideoDocument>,
        private userService: UserService,
        private fileService: FileService
    ) { }

    async createVideo(createVideoDto: CreateVideoDto, picture: any, video: any): Promise<Video> {
        const info: CreateVideoDto = plainToClass(CreateVideoDto, createVideoDto);
        const errors: ValidationError[] = await validate(info);

        if (errors.length > 0) {
            const errorMessage = errors.map((error) => Object.values(error.constraints)).join(', ');
            throw new BadRequestException(errorMessage);
        }

        const videoPath = await this.fileService.createFile(FileType.VIDEO, video)
        const picturePath = await this.fileService.createFile(FileType.IMAGE, picture)
        const createdVideo = await this.videoModel.create({ ...createVideoDto, videoPath: videoPath, picturePath: picturePath })
        return await createdVideo.save();
    }

    async addVideoTags(userId: string, videoId: string) {
        const user: any = await this.userService.findById(userId);
        const video: Video = await this.videoModel.findById(videoId);

        if (!user || !video) {
            throw new Error('User or Video not found');
        }

        const videoTags = video.tags;
        const userTags = user.tags;

        const newTags = videoTags.filter((tag) => !userTags.includes(tag));

        if (newTags.length > 0) {
            user.tags = [...userTags, ...newTags];
            await user.save();
        }
    }

    async getNews(): Promise<Video[]> {
        const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);

        const videos: Video[] = await this.videoModel.find({
            createdAt: { $gte: twentyFourHoursAgo },
        }).populate('user');

        if (videos) {
            return videos
        }
        return []
    }

    async getVideosByUser(userId: string, count: number = 20, offset: number = 0): Promise<Video[]> {
        const videos: Video[] = await this.videoModel.find({ user: userId }).skip(Number(offset)).limit(Number(count));
        return videos
    }

    async getVideosByUserTags(userId: string): Promise<Video[]> {
        const user: any = await this.userService.findById(userId);

        if (!user) {
            return [];
        }

        const tagsRegex = user.tags.map(tag => new RegExp(tag, 'i'));

        const videos: Video[] = await this.videoModel.find({
            tags: { $in: tagsRegex },
        }).populate('user');
        if (videos.length > 0) {
            return videos;
        }

        return [];
    }

    async getCountViews(): Promise<number> {
        const result = await this.videoModel.aggregate([
            {
                $group: {
                    _id: null,
                    totalViews: { $sum: '$viewCount' },
                },
            },
        ]);

        if (result.length > 0) {
            return result[0].totalViews;
        } else {
            return 0;
        }
    }

    async getCountVideos(): Promise<number> {
        return await this.videoModel.countDocuments()
    }

    async getVideoById(id: string): Promise<Video> {
        try {
            const video: Video = await this.videoModel.findOne({ _id: id }).exec()
            return video
        } catch (err) {
            throw new NotFoundException()
        }
    }

    async upLike(_id: string, likeCount: number): Promise<number> {
        const video = await this.videoModel.findOneAndUpdate(
            { _id },
            { likeCount: likeCount + 1 },
            { new: true }
        ).exec()
        await video.save()
        return video.likeCount
    }

    async downLike(_id: string, likeCount: number): Promise<number> {
        const video = await this.videoModel.findOneAndUpdate(
            { _id },
            { likeCount: likeCount - 1 },
            { new: true }
        ).exec()
        await video.save()
        if (video) {
            return video.likeCount
        }
    }

    async getStreamVideo(videoId: string, response: any) {
        try {
            const video: Video = await this.videoModel.findOne({ _id: videoId }).exec();
            const videoPath: string = path.resolve(process.cwd(), 'static', video.videoPath);

            const stat: fs.Stats = fs.statSync(videoPath);
            const fileSize: number = stat.size;
            const range: string = response.req.headers.range;

            if (range) {
                const parts: string[] = range.replace(/bytes=/, '').split('-');
                const start: number = parseInt(parts[0], 10);
                const end: number = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
                const chunkSize: number = end - start + 1;

                response.status(206);
                response.setHeader('Content-Range', `bytes ${start}-${end}/${fileSize}`);
                response.setHeader('Accept-Ranges', 'bytes');
                response.setHeader('Content-Length', chunkSize);
                response.setHeader('Content-Type', 'video/mp4');

                const ffmpegArgs: string[] = [
                    '-i',
                    videoPath,
                    '-c:v',
                    'libx264',
                    '-preset',
                    'slow',
                    '-crf',
                    '18',
                    '-maxrate',
                    '10M',
                    '-bufsize',
                    '20M',
                    '-c:a',
                    'copy',
                    '-movflags',
                    '+faststart',
                    '-f',
                    'mp4',
                    'pipe:1',
                ];

                const ffmpegProcess = spawn('ffmpeg', ffmpegArgs, { stdio: ['ignore', 'pipe', 'ignore'] });

                ffmpegProcess.stdout.on('data', (data) => {
                    response.write(data);
                });

                ffmpegProcess.stdout.on('end', () => {
                    response.end();
                });
            } else {
                response.status(200);
                response.setHeader('Content-Length', fileSize);
                response.setHeader('Content-Type', 'video/mp4');

                const videoStream = fs.createReadStream(videoPath);
                videoStream.pipe(response);
            }
        } catch (err) {
            throw new NotFoundException();
        }
    }


    async getRandom(): Promise<Video[]> {
        const videos: Video[] = await this.videoModel.find().populate('user')

        const shuffledVideos = shuffleArray(videos);

        console.log(shuffledVideos)

        const videosToSelect = Math.ceil(videos.length * 0.3);

        const selectedVideos = shuffledVideos.slice(0, videosToSelect);
        return selectedVideos

        function shuffleArray(array: any[]) {
            const shuffled = array.slice();
            for (let i = shuffled.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
            }
            return shuffled;
        }
    }

    async searchVideo(query: string) {
        const videos: Video[] = await this.videoModel.find({
            name: {
                $regex: query,
                $options: "i"
            }
        }).populate('user');
        console.log(videos);
        return videos
    }
}