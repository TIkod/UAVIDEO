import { Controller, Post, Body, Get, Param, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { VideoService } from './video.service';
import { Video } from './schemas/video.schema';
import { CreateVideoDto } from './dto/CreateVideoDto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('videos')
export class VideoController {
    constructor(private readonly videoService: VideoService) { }

    @Post()
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'picture', maxCount: 1 },
        { name: 'video', maxCount: 1 }
    ]))
    async createVideo(@UploadedFiles() files, @Body() createVideoDto: CreateVideoDto): Promise<Video> {
        const { picture, video } = files;
        return this.videoService.createVideo(createVideoDto, picture[0], video[0]);
    }

    @Get('user/:userId')
    async getVideosByUser(@Param('userId') userId: string): Promise<Video[]> {
        return this.videoService.getVideosByUser(userId);
    }
}
