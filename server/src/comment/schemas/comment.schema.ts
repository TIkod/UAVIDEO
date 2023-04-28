import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { Like } from "src/like/schemas/like.schema";
import { User } from "src/user/schemas/user.schema";
import { Video } from "src/video/schemas/video.schema";

export type CommentDocument = Comment & Document;

@Schema()
export class Comment {
    @Prop()
    text: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    author: User;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Video' })
    video: Video;
}

export const CommentSchema: SchemaFactory = SchemaFactory.createForClass(Comment);

