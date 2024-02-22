import { Controller, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dtos";

@Controller("auth")
export class UserController {

    constructor(
        private readonly userService: UserService
    ){}

    @Post("signup")
    async signup(createUserDto: CreateUserDto) {
        return this.userService.signup(createUserDto)
    }
} 
