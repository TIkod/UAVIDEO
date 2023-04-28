import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type VideoDocument = Video & Document;

@Schema()
export class Video {

}

export const VideoSchema: SchemaFactory = SchemaFactory.createForClass(Video);