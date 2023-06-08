import { Module } from "@nestjs/common";
import { VideoController } from "./video.controller";
import { VideoService } from "./video.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Video, VideoSchema } from "./schemas/video.schema";
import { FileService } from "src/file/file.service";
import { UsersModule } from "src/user/user.module";
import { JwtModule } from "@nestjs/jwt";
import { UserService } from "src/user/user.service";
import { UserSchema } from "src/user/schemas/user.schema";


@Module({
    controllers: [VideoController],
    providers: [VideoService, FileService, UserService],
    imports: [
        MongooseModule.forFeature([{ name: Video.name, schema: VideoSchema }, { name: 'User', schema: UserSchema }, { name: 'Video', schema: VideoSchema }]),
        UsersModule,
        VideoModule,
        JwtModule.register({})
    ],
})
export class VideoModule { }