import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TypeORM } from "@fireman/common/providers-typeorm"

async function bootstrap() {
  await TypeORM.init()
  const app = await NestFactory.create(AppModule);
  await app.listen(5000);
}
bootstrap();
