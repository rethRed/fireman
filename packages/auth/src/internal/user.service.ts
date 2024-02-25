import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dtos";
import { UserEntity } from "./user.entity";
import { EmailAlreadyInUseError, UsernameAlreadyInUseError } from "./errors";
import { Either, failure, success } from "@common/logic";
import { DomainError } from "@common/errors";
import { TypeORM } from "@common/providers/typeorm";

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
