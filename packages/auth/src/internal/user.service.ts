import { Injectable } from "@nestjs/common";
import { CreateUserDto, SigninDto } from "./dtos";
import { UserEntity } from "./user.entity";
import { EmailAlreadyInUseError, InvalidCredentialsError, UserNotFoundError, UsernameAlreadyInUseError } from "./errors";
import { Either, failure, success } from "@common/logic";
import { DomainError } from "@common/errors";
import { TypeORM } from "@common/providers/typeorm";
import { JwtService } from "./jwt.service";
import { InvalidTokenError } from "@auth/@public-infra/guards/errors";

@Injectable()
export class UserService {
    
    constructor(
        private readonly jwtService: JwtService 
    ){}

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

    async signin(signinDto: SigninDto): Promise<Either<DomainError, { accessToken: string }>> {
        
        let user: UserEntity | null = await TypeORM.em.findOneBy(UserEntity, { email: signinDto.emailOrUsername })
        if(!user) user = await TypeORM.em.findOneBy(UserEntity, { username: signinDto.emailOrUsername })

        if(!user) throw new InvalidCredentialsError()

        if(!user.comparePassword(signinDto.password)) throw new InvalidCredentialsError()

        return success({ accessToken: await this.jwtService.generateAccessToken({ userId: user.id }) })
    }

    async currentUser(userId: string): Promise<Either<DomainError, any>> {
        const user = await TypeORM.em.findOneBy(UserEntity, { id: userId })
        if(!user) throw new UserNotFoundError()
        return success({
            id: user.id,
            email: user.email,
            username: user.username
        })
    }
}
