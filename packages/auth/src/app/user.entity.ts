import { IsEmail, IsString, Length } from "class-validator"
import { randomUUID } from "crypto"
import { Column, Entity } from "typeorm"
import { BaseEntity } from "@fireman/common/entity"
import { Either, failure, success } from "@fireman/common/logic"
import { DomainError } from "@fireman/common/errors"
import bcrypt from "bcryptjs"
import { CreateUserDto } from "./dtos"

@Entity("users")
export class UserEntity extends BaseEntity() {

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


}


export namespace UserEntity {
    
    
    export type Props = {
        email: string
        username: string
        password: string
    }
}
