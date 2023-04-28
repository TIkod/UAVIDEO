import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { Video } from "src/video/schemas/video.schema";

export type TagDocument = Tag & Document;

@Schema()
export class Tag {

    @Prop()
    name: string;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Video' }] })
    videos: Video[];

}

export const TagSchema: SchemaFactory = SchemaFactory.createForClass(Tag);

