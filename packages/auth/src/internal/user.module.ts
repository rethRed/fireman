import { Global, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtService } from './jwt.service';


@Global()
@Module({
  imports: [],
  controllers: [
    UserController
  ],
  providers: [
    UserService,
    JwtService
  ],
  exports: [
    JwtService
  ]
})
export class UserModule {}
