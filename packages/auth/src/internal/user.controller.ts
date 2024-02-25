import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dtos";
import { Request } from "express";
import { AppGuard, AppGuardOptions } from "@common/guards";

@Controller("auth")
export class UserController {

    constructor(
        private readonly userService: UserService
    ){}

    @Post("signup")
    async signup(
        @Body() createUserDto: CreateUserDto
    ) {
        return await this.userService.signup(createUserDto).then(async res => {
            if(res.isFailure()) throw res.value

            const response = await this.userService.signin({ emailOrUsername: createUserDto.email, password: createUserDto.password })

            return {
                ...res.value,
                accessToken: response.isSuccess() ? response.value.accessToken : undefined
            }
        })
    }

    @Post("signin")
    async signin(
        @Body() signinDto: { emailOrUsername: string, password: string }
    ) {
        return await this.userService.signin(signinDto).then(res => {
            if(res.isFailure()) throw res.value
            return res.value
        })
    }

    @AppGuardOptions()
    @UseGuards(...AppGuard({
        authGuard: true
    }))
    @Post("current-user")
    async currentUser(
        @Req() req: Request
    ) {
        return await this.userService.currentUser(req.currentUser.id).then(res => {
            if(res.isFailure()) throw res.value
            return res.value
        })
    }
} 
