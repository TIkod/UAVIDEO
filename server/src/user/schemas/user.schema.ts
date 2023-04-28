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

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Video' }] })
    videos: Video[];

    @Prop({ type: [{ type: String }] })
    tags: string[];

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'History' }] })
    history: History[];

}

export const UserSchema: SchemaFactory = SchemaFactory.createForClass(User);

