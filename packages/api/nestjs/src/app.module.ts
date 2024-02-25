import { Module } from '@nestjs/common';
import { AuthModule } from "@auth/@public-infra"
import { SupportModule } from "@support/@public-infra"
import { FiremanModule } from "@fireman/@public-infra"

@Module({
  imports: [
    AuthModule,
    SupportModule,
    FiremanModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
