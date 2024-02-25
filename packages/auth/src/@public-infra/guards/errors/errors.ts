import { HttpException } from "@nestjs/common";


export class InvalidTokenError extends HttpException {
    constructor() {
        super("The token is invalid", 403)
        this.name = this.constructor.name
    }
} 


export class InvalidAdminTokenError extends HttpException {
    constructor() {
        super("The admin token is invalid", 403)
        this.name = this.constructor.name
    }
} 
