import { Injectable } from '@nestjs/common';
import { VideoService } from 'src/video/video.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class StatisticService {
    constructor(
        private videoService: VideoService,
        private userService: UserService,
    ) { }


    async getStatistic(): Promise<{ views: number, videos: number, users: number }> {
        const views = await this.videoService.getCountViews();
        const videos = await this.videoService.getCountVideos();
        const users = await this.userService.getCountUsers();
        return { views, videos, users };
    }

}
