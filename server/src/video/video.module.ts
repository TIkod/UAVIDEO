import { Module } from "@nestjs/common";
import { VideoController } from "./video.controller";
import { VideoService } from "./video.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Video, VideoSchema } from "./schemas/video.schema";


@Module({
    controllers: [VideoController],
    providers: [VideoService],
    imports: [
        MongooseModule.forFeature([{ name: Video.name, schema: VideoSchema }])
    ]
})
export class VideoModule { }