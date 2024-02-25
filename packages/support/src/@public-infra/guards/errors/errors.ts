import { HttpException } from "@nestjs/common";


export class UserNotSupportError extends HttpException {
    constructor() {
        super("the user is not a suport", 403)
        this.name = this.constructor.name
    }
} 
