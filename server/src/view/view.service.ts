import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { View } from './schemas/view.schema';
import { User } from 'src/user/schemas/user.schema';
import { Video } from 'src/video/schemas/video.schema';
import { VideoService } from 'src/video/video.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ViewService {
    constructor(
        @InjectModel('View') private readonly viewModel: Model<View>,
        private videoService: VideoService,
        private userService: UserService,
    ) { }

    async upView(idVideo: string, idUser: string): Promise<{ views: number }> {
        try {
            const video: Video | any = await this.videoService.getVideoById(idVideo);
            const user: User | any = await this.userService.findById(idUser);
            const existingView: View = await this.viewModel.findOne({ user: user._id, video: video._id }).exec();

            if (!existingView) {
                video.viewCount++;
                const view = new this.viewModel({ user: user._id, video: video._id })

                await view.save();
                await video.save();
            }
            return { views: video.viewCount };
        }
        catch (error) {
            console.log(error);
            throw new NotFoundException()
        }
    }

}
