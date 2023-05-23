import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from 'src/user/user.service';
import { VideoService } from 'src/video/video.service';
import { UsersModule } from 'src/user/user.module';
import { VideoModule } from 'src/video/video.module';
import { UserSchema } from 'src/user/schemas/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { FileService } from 'src/file/file.service';
import { VideoSchema } from 'src/video/schemas/video.schema';
import { LikeSchema } from './schemas/like.schema';
import { LikeController } from './like.controller';
import { LikeService } from './like.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Like', schema: LikeSchema }, { name: 'User', schema: UserSchema }, { name: 'Video', schema: VideoSchema }]),
        UsersModule,
        VideoModule,
    JwtModule.register({})
    ],
    controllers: [LikeController],
    providers: [LikeService, UserService, VideoService, FileService],
})
export class LikeModule { }