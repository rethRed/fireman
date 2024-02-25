
import { CanActivate, ExecutionContext, Inject, Injectable } from "@nestjs/common";
import { Request, Response } from "express";
import { Reflector } from "@nestjs/core";
import { InvalidTokenError } from "./errors";
import { PropertyConfigMap, PropertyConfig, } from "@common/guards"
type User = {
    id: string
}

type Store = {
    id: string
}

declare global {
    namespace Express {
        interface Request {
            currentUser: User;
            currentStore: Store
        }
    }
}
@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private reflector: Reflector,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        // const input = this.reflector.get<PropertyConfigMap>(AppGuardOptions, context.getHandler())

        const ctx = context.switchToHttp();
        const req: Request = ctx.getRequest<Request>();

        let accessToken: string = req.headers?.authorization ?? ""
        accessToken = accessToken.replace("Bearer ", "")

        if(false) throw new InvalidTokenError()


        req.currentUser = {
            id: "result.value.id"
        }

        return true
    }

}

export namespace AuthGuard {

    export type Input = PropertyConfig & {}
}