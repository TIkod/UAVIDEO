import { Module } from "@nestjs/common";
import { VideoController } from "./video.controller";
import { VideoService } from "./video.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Video, VideoSchema } from "./schemas/video.schema";
import { FileService } from "src/file/file.service";


@Module({
    controllers: [VideoController],
    providers: [VideoService, FileService],
    imports: [
        MongooseModule.forFeature([{ name: Video.name, schema: VideoSchema }])
    ]
})
export class VideoModule { }