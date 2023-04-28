import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { User } from "src/user/schemas/user.schema";
import { Video } from "src/video/schemas/video.schema";

export type LikeDocument = Like & Document;

@Schema()
export class Like {

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: User;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Video' })
    video: Video;

}

export const LikeSchema: SchemaFactory = SchemaFactory.createForClass(Like);

