import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import path from 'path';
import { VideoModule } from './video/video.module';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://admin:admin@cluster0.txyhyzg.mongodb.net/test'),
    ServeStaticModule.forRoot({ rootPath: path.resolve(__dirname, "static") }),
    VideoModule
  ]
})

export class AppModule { }
