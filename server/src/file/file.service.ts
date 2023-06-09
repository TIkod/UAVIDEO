import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import * as path from "path";
import * as fs from "fs";
import { v4 as uuid } from 'uuid';
import * as ffmpeg from 'fluent-ffmpeg';
import * as sharp from 'sharp';

export enum FileType {
  VIDEO = 'video',
  IMAGE = 'image',
}

@Injectable()
export class FileService {
  async createFile(type: FileType, file): Promise<string> {
    try {
      const fileExtension: string = file.originalname.split('.').pop();
      const fileName: string = uuid() + '.' + fileExtension;
      const filePath: string = path.resolve(process.cwd(), 'static');

      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }

      if (type === FileType.VIDEO) {
        const fileBuffer: Buffer = file.buffer;
        fs.writeFileSync(path.resolve(filePath, type, fileName), fileBuffer);
        const compressedFileName: string = uuid() + '.' + fileExtension;
        const compressedFilePath: string = path.resolve(filePath, type, compressedFileName);
        await new Promise<void>((resolve, reject) => {
          ffmpeg(path.resolve(filePath, type, fileName))
            .outputOptions('-crf 28')
            .on('start', function (commandLine) {
            })
            .on('error', function (err) {
              reject(err);
            })
            .on('end', function () {
              fs.unlinkSync(path.resolve(filePath, type, fileName));
              resolve();
            })
            .save(compressedFilePath);
        });
        return compressedFilePath;
      } else {
        const fileBuffer: Buffer = file.buffer;
        fs.writeFileSync(path.resolve(filePath, type, fileName), fileBuffer);
        return type + '/' + fileName;
      }

    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}