import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dtos";
import { UserEntity } from "./user.entity";
import { TypeORM } from "@fireman/common/providers-typeorm"
import { EmailAlreadyInUseError, UsernameAlreadyInUseError } from "./errors";
import { success } from "@fireman/common/logic";

@Injectable()
export class UserService {
    
    async signup(createUserDto: CreateUserDto) {
        const user = UserEntity.create(createUserDto)
        if(user.isFailure()) return user.value

        const emailInUse = await TypeORM.em.findBy(UserEntity, { email: user.value.email })
        if(emailInUse) throw new EmailAlreadyInUseError()

        const usernameInUse = await TypeORM.em.findBy(UserEntity, { username: user.value.username })
        if(usernameInUse) throw new UsernameAlreadyInUseError()

        await TypeORM.em.save(user.value)

        return success(user.value)
    }
}
