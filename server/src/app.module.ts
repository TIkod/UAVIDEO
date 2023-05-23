import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from "path";
import { VideoModule } from './video/video.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './user/user.module';
import { FileModule } from './file/file.module';
import { ViewModule } from './view/view.module';
import { LikeModule } from './like/like.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    ServeStaticModule.forRoot({ rootPath: path.join(__dirname, '..', 'static') }),
    UsersModule,
    VideoModule,
    ViewModule,
    FileModule,
    LikeModule
  ]
})

export class AppModule { }
