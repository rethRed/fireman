import { Body, Controller, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dtos";

@Controller("auth")
export class UserController {

    constructor(
        private readonly userService: UserService
    ){}

    @Post("signup")
    async signup(
        @Body() createUserDto: CreateUserDto
    ) {
        return this.userService.signup(createUserDto)
    }
} 
