import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { History } from "src/history/schemas/history.schema";
import { Video } from "src/video/schemas/video.schema";

export type UserDocument = User & Document;

@Schema()
export class User {

    @Prop()
    name: string;

    @Prop()
    email: string;

    @Prop()
    password: string;

    @Prop({ default: false })
    isVerified: boolean;

    @Prop()
    verificationToken: string

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Video' }] })
    videos: Video[];

    @Prop({ type: [{ type: String }] })
    tags: string[];

    @Prop({ type: String, enum: ['USER', 'ADMIN'], default: 'USER' })
    role: string
}

export const UserSchema: SchemaFactory = SchemaFactory.createForClass(User);

