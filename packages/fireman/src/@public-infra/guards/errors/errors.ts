import { HttpException } from "@nestjs/common";


export class UserNotFiremanError extends HttpException {
    constructor() {
        super("the user is not a fireman", 403)
        this.name = this.constructor.name
    }
} 
