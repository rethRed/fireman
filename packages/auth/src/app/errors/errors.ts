import { HttpException } from "@nestjs/common";


export class EmailAlreadyInUseError extends HttpException {
    constructor() {
        super("email already in use", 409)
        this.name = this.constructor.name
    }
} 

export class UsernameAlreadyInUseError extends HttpException {
    constructor() {
        super("username already in use", 409)
        this.name = this.constructor.name
    }
}
