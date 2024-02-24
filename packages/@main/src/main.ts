import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupTypeORM } from './setup-typeorm';
import { DomainErrorFilter, HttpExceptionFilter } from './filters';

async function bootstrap() {

  await setupTypeORM()


  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new HttpExceptionFilter())
  app.useGlobalFilters(new DomainErrorFilter())

  await app.listen(5000);
}
bootstrap();
//d