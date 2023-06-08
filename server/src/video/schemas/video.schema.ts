import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { Comment } from "src/comment/schemas/comment.schema";

export type VideoDocument = Video & Document;

@Schema()
export class Video {
    @Prop()
    name: string;

    @Prop()
    description: string;

    @Prop()
    videoPath: string;

    @Prop()
    picturePath: string;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }] })
    comments: Comment[];

    @Prop({ default: 0 })
    viewCount: number;

    @Prop({ default: 0 })
    likeCount: number;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: mongoose.Types.ObjectId;

    @Prop({ type: [{ type: String }] })
    tags: string[];

    @Prop({ default: Date.now })
    createdAt: Date;
}

export const VideoSchema: SchemaFactory = SchemaFactory.createForClass(Video);

