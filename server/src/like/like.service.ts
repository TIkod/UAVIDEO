import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';
import { Video } from 'src/video/schemas/video.schema';
import { VideoService } from 'src/video/video.service';
import { UserService } from 'src/user/user.service';
import { Like } from './schemas/like.schema';

@Injectable()
export class LikeService {
    constructor(
        @InjectModel('Like') private readonly likeModel: Model<Like>,
        private videoService: VideoService,
        private userService: UserService,
    ) { }

    async changeLike(idVideo: string, idUser: string): Promise<{ likeCount: number }> {
        try {
            const video: Video | any = await this.videoService.getVideoById(idVideo);
            const user: User | any = await this.userService.findById(idUser);
            const existingLike: Like | any = await this.likeModel.findOne({ user: user._id, video: video._id }).exec();
            let likeCount: number;
            if (!existingLike) {
                likeCount = await this.videoService.upLike(video._id, video.likeCount);
                const like = new this.likeModel({ user: user._id, video: video._id })

                await like.save();
                await video.save();
            } else {
                likeCount = await this.videoService.downLike(video._id, video.likeCount);
                await this.likeModel.deleteOne({ _id: existingLike!._id })
                await video.save();
            }
            return { likeCount };
        }
        catch (error) {
            throw new NotFoundException()
        }
    }

}
