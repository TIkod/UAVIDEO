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


@Injectable()
export class VideoService {
    constructor(
        @InjectModel(Video.name) private videoModel: Model<VideoDocument>,
        private fileService: FileService
    ) { }

    async createVideo(createVideoDto: CreateVideoDto, picture: any, video: any): Promise<Video> {
        const info: CreateVideoDto = plainToClass(CreateVideoDto, createVideoDto);
        const errors: ValidationError[] = await validate(info);

        if (errors.length > 0) {
            const errorMessage = errors.map((error) => Object.values(error.constraints)).join(', ');
            throw new BadRequestException(errorMessage);
        }

        const videoPath = this.fileService.createFile(FileType.VIDEO, video)
        const picturePath = this.fileService.createFile(FileType.IMAGE, picture)
        const createdVideo = await this.videoModel.create({ ...createVideoDto, videoPath: videoPath, picturePath: picturePath })
        return await createdVideo.save();
    }

    async getVideosByUser(userId: string, count: number = 5, offset: number = 0): Promise<Video[]> {
        const videos: Video[] = await this.videoModel.find({ user: userId }).skip(Number(offset)).limit(Number(count));
        return videos
    }

    async getVideoById(id: string): Promise<Video> {
        try {
            const video: Video = await this.videoModel.findOne({ _id: id }).exec()
            return video
        } catch (err) {
            throw new NotFoundException()
        }
    }

    async getStreamVideo(videoId: string, response: any) {
        try {
            const video: Video = await this.videoModel.findOne({ _id: videoId }).exec();
            const videoPath: string = path.resolve(process.cwd(), 'static', video.videoPath)

            const stat: any = fs.statSync(videoPath);
            const fileSize: number = stat.size;
            const range: string = response.req.headers.range;

            if (range) {
                const parts: string[] = range.replace(/bytes=/, '').split('-');
                const start: number = parseInt(parts[0], 10);
                const end: number = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
                const chunkSize: number = end - start + 1;
                const file: fs.ReadStream = fs.createReadStream(videoPath, { start, end });

                response.status(206);
                response.setHeader('Content-Range', `bytes ${start}-${end}/${fileSize}`);
                response.setHeader('Accept-Ranges', 'bytes');
                response.setHeader('Content-Length', chunkSize);
                response.setHeader('Content-Type', 'video/mp4');

                file.pipe(response);
            } else {
                response.status(200);
                response.setHeader('Content-Length', fileSize);
                response.setHeader('Content-Type', 'video/mp4');
                fs.createReadStream(videoPath).pipe(response);
            }
        }
        catch (err) {
            console.log(err);
            throw new NotFoundException()
        }
    }
}
