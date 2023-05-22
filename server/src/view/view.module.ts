import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ViewSchema } from './schemas/view.schema';
import { ViewService } from './view.service';
import { ViewController } from './view.controller';
import { UserService } from 'src/user/user.service';
import { VideoService } from 'src/video/video.service';
import { UsersModule } from 'src/user/user.module';
import { VideoModule } from 'src/video/video.module';
import { UserSchema } from 'src/user/schemas/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { FileService } from 'src/file/file.service';
import { VideoSchema } from 'src/video/schemas/video.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'View', schema: ViewSchema }, { name: 'User', schema: UserSchema }, { name: 'Video', schema: VideoSchema }]),
        UsersModule,
        VideoModule,
    JwtModule.register({})
    ],
    controllers: [ViewController],
    providers: [ViewService, UserService, VideoService, FileService],
})
export class ViewModule { }