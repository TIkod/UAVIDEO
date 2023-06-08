import { Controller, Post, Body, Get, Param, UseInterceptors, UploadedFiles, BadRequestException, Query, UseGuards, Res } from '@nestjs/common';
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

        if (Object.keys(files).includes('video') == false || Object.keys(files).includes('picture') == false) {
            throw new BadRequestException("Video and picture is required");
        }

        const { picture, video } = files;
        return this.videoService.createVideo(createVideoDto, picture[0], video[0]);
    }

    @Get('user/:userId')
    async getVideosByUser(@Param('userId') userId: string, @Query('count') count: number, @Query('offset') offset: number,): Promise<Video[]> {
        return this.videoService.getVideosByUser(userId, count, offset);
    }

    @Get('user/:userId/tags')
    async getVideosByUserTags(@Param('userId') userId: string): Promise<Video[]> {
        return this.videoService.getVideosByUserTags(userId);
    }

    @Get('/stream/:id')
    async streamVideo(@Param('id') videoId: string, @Res() response: Response) {
        return this.videoService.getStreamVideo(videoId, response);
    }

    @Get('/news')
    async getNews() {
        return this.videoService.getNews();
    }

    @Get('/random')
    async getRandom() {
        return this.videoService.getRandom();
    }

    @Get(':id')
    async getVideoById(@Param('id') id: string): Promise<Video> {
        return this.videoService.getVideoById(id);
    }


}
