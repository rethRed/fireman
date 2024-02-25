import { Module } from '@nestjs/common';
import { FiremanService } from './fireman.service';
import { FiremanController } from './fireman.controller';



@Module({
  imports: [],
  controllers: [
    FiremanController
  ],
  providers: [
    FiremanService
  ],
})
export class FiremanModule {}
