import { IsEmail, IsString, Length } from "class-validator"
import { randomUUID } from "crypto"
import { Column, Entity } from "typeorm"
import { BaseEntity } from "@fireman/common/entity"

@Entity()
export class User extends BaseEntity() {

    @Column({ name: "email" })
    @IsString()
    @IsEmail()
    email!: string

    @Column({ name: "username" })
    @IsString()
    @Length(3, 30)
    username!: string

    @Column({ name: "password" })
    @IsString()
    @Length(8, 30)
    password!: string


    constructor(input: User.Input) {
        super()
        if(!input) return
        this.email = input.email
        this.username = input.username
        this.password = input.password
    }


}


export namespace User {
    
    export type Input = {
        email: string
        username: string
        password: string
    }
    
    export type Props = {
        email: string
        username: string
        password: string
    }
}
