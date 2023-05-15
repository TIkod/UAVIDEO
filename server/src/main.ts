import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';

async function start(): Promise<void> {
  try {
    const PORT: string = process.env.PORT;
    const app: INestApplication = await NestFactory.create(AppModule);
    app.enableCors();
    await app.listen(4000, (): void => console.log(`Server start on ${PORT} PORT`));
  } catch (e) {
    console.log(e.message)
  }
}

start();
