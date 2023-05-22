import { BadRequestException, Injectable, ValidationError } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Video, VideoDocument } from './schemas/video.schema';
import { CreateVideoDto } from './dto/CreateVideoDto';
import { FileService, FileType } from 'src/file/file.service';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

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
}
