import dotenv from 'dotenv'
dotenv.config()

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';

async function start(): Promise<void> {
  try {
    const PORT: number = Number(process.env.PORT) || 5000;
    const app: INestApplication = await NestFactory.create(AppModule);
    app.enableCors();
    await app.listen(PORT, (): void => console.log(`Server start on ${PORT} PORT`));
  } catch (e) {
    console.log(e.message)
  }
}

start();
