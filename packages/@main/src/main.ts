import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupTypeORM } from './setup-typeorm';

async function bootstrap() {

  await setupTypeORM()

  const app = await NestFactory.create(AppModule);
  await app.listen(5000);
}
bootstrap();
//d