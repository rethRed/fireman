import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dtos";
import { UserEntity } from "./user.entity";
import { EmailAlreadyInUseError, UsernameAlreadyInUseError } from "./errors";
import { Either, failure, success } from "@fireman/common/logic";
import { TypeORM } from "./@shared";
import { DomainError } from "@fireman/common/errors";
//ssd
@Injectable()
export class UserService {
    
    async signup(createUserDto: CreateUserDto): Promise<Either<DomainError, { id: string }>> {
        const user = UserEntity.create(createUserDto)
        if(user.isFailure()) return failure(user.value)

        const emailInUse = await TypeORM.em.findOneBy(UserEntity, { email: user.value.email })
        if(emailInUse) throw new EmailAlreadyInUseError()

        const usernameInUse = await TypeORM.em.findOneBy(UserEntity, { username: user.value.username })
        if(usernameInUse) throw new UsernameAlreadyInUseError()

        await TypeORM.em.save(user.value)

        return success({ id: user.value.id })
    }
}
