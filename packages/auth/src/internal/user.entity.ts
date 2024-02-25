import { IsEmail, IsString, Length } from "class-validator"
import { randomUUID } from "crypto"
import { Column, Entity } from "typeorm"
import { BaseTypeormEntity } from "@common/entity"
import { Either, failure, success } from "@common/logic"
import { DomainError } from "@common/errors"
import bcrypt from "bcryptjs"
import { CreateUserDto } from "./dtos"


@Entity("users")
export class UserEntity extends BaseTypeormEntity() {

    @Column({ name: "email", unique: true })
    @IsString()
    @IsEmail()
    email!: string

    @Column({ name: "username", unique: true })
    @IsString()
    @Length(3, 30)
    username!: string

    @Column({ name: "password" })
    @IsString()
    @Length(8, 30)
    password!: string


    constructor(input: CreateUserDto) {
        super()
        input && this.assignProperties(input)
    }

    static create(input: CreateUserDto): Either<DomainError, UserEntity> {
        const user = new UserEntity(input)
        
        const validateResult = user.validateAllPropertities()
        if(validateResult.isFailure()) return failure(validateResult.value) 

        user.hashPassword()

        return success(user)
    }

    hashPassword() {
        this.password =  bcrypt.hashSync(this.password, 10)
    }

    comparePassword(plainTextPassword: string): boolean {
        return bcrypt.compareSync(plainTextPassword, this.password)
    }


}


export namespace UserEntity {
    
    
    export type Props = {
        email: string
        username: string
        password: string
    }
}
