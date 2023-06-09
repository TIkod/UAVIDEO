import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { User } from "src/user/schemas/user.schema";
import { Video } from "src/video/schemas/video.schema";

export type ViewDocument = View & Document;

@Schema()
export class View {

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: User;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Video' })
    video: Video;

}

export const ViewSchema: SchemaFactory = SchemaFactory.createForClass(View);

