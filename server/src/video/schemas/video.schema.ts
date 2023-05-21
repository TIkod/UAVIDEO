import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { Comment } from "src/comment/schemas/comment.schema";
import { Like } from "src/like/schemas/like.schema";
import { User } from "src/user/schemas/user.schema";

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

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: User;

    @Prop({ type: [{ type: String }] })
    tags: string[];
}

export const VideoSchema: SchemaFactory = SchemaFactory.createForClass(Video);

