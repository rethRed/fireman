import { Module } from '@nestjs/common';
import { AuthModule } from "@fireman/auth/@public-infra"

@Module({
  imports: [
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
