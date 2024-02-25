import { IsString } from "class-validator";
import { UserEntity } from "./user.entity";
import { PartialType, } from "@nestjs/swagger"

export class CreateUserDto  {
    email!: string
    password!: string
} 


export class SigninDto  {
    @IsString()
    emailOrUsername!: string

    @IsString()
    password!: string
} 


export type JwtUser = {
    userId: string
}