import path from 'path';
import dotenv from 'dotenv'
dotenv.config({
  path: process.cwd() + '/.env'
})
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DomainErrorFilter, HttpExceptionFilter } from './filters';
import { TypeORM } from '@common/providers/typeorm';


async function bootstrap() {


  await TypeORM.init()

  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new HttpExceptionFilter())
  app.useGlobalFilters(new DomainErrorFilter())

  await app.listen(5000);
}
bootstrap();
