
import { CanActivate, ExecutionContext, Inject, Injectable } from "@nestjs/common";
import { Request, Response } from "express";
import { Reflector } from "@nestjs/core";
import { InvalidTokenError } from "./errors";
import { PropertyConfig, } from "@common/guards/config-map"
import { JwtService } from "@auth/internal/jwt.service";
type User = {
    id: string
}



declare global {
    namespace Express {
        interface Request {
            currentUser: User;
        }
    }
}
@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private reflector: Reflector,
        private readonly jwtService: JwtService
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        // const input = this.reflector.get<PropertyConfigMap>(AppGuardOptions, context.getHandler())

        const ctx = context.switchToHttp();
        const req: Request = ctx.getRequest<Request>();

        let accessToken: string = req.headers?.authorization ?? ""
        accessToken = accessToken.replace("Bearer ", "")

        const user = await this.jwtService.verifyAccessToken(accessToken)

        if(!user) throw new InvalidTokenError()

        req.currentUser = {
            id: user.userId
        }

        return true
    }

}

export namespace AuthGuard {

    export type Input = PropertyConfig & {}
}