import { HttpException } from "@nestjs/common";


export class UserAlreadySupportError extends HttpException {
    constructor() {
        super("already suport", 409)
        this.name = this.constructor.name
    }
} 




export class UserNotASupportError extends HttpException {
    constructor() {
        super("user not a support", 409)
        this.name = this.constructor.name
    }
} 


export class UserNotFoundError extends HttpException {
    constructor() {
        super("user not found", 404)
        this.name = this.constructor.name
    }
} 
