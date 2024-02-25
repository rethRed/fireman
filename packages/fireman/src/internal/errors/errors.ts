import { HttpException } from "@nestjs/common";


export class UserAlreadyAFiremanError extends HttpException {
    constructor() {
        super("already fireman", 409)
        this.name = this.constructor.name
    }
} 

export class UserNotAFiremanError extends HttpException {
    constructor() {
        super("user not a fireman", 404)
        this.name = this.constructor.name
    }
} 




export class UserNotFoundError extends HttpException {
    constructor() {
        super("user not found", 404)
        this.name = this.constructor.name
    }
} 
