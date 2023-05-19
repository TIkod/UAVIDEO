import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Video, VideoDocument } from './schemas/video.schema';
import { CreateVideoDto } from './dto/CreateVideoDto';
import { FileService, FileType } from 'src/file/file.service';

@Injectable()
export class VideoService {
    constructor(
        @InjectModel(Video.name) private videoModel: Model<VideoDocument>,
        private fileService: FileService
    ) { }

    async createVideo(createVideoDto: CreateVideoDto, picture: any, video: any): Promise<Video> {
        const videoPath = this.fileService.createFile(FileType.AUDIO, video)
        const picturePath = this.fileService.createFile(FileType.IMAGE, picture)
        const createdVideo = await this.videoModel.create({ ...createVideoDto, videoPath: videoPath, picturePath: picturePath })
        return await createdVideo.save();
    }

    async getVideosByUser(userId: string): Promise<Video[]> {
        return await this.videoModel.find({ user: userId });
    }
}
