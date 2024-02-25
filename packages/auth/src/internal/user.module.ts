import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtService } from './jwt.service';



@Module({
  imports: [],
  controllers: [
    UserController
  ],
  providers: [
    UserService,
    JwtService
  ],
})
export class UserModule {}
