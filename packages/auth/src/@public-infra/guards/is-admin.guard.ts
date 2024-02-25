
import { CanActivate, ExecutionContext, Inject, Injectable } from "@nestjs/common";
import { Request, Response } from "express";
import { Reflector } from "@nestjs/core";
import { InvalidTokenError } from "./errors";
import { AppGuardOptions, PropertyConfig, PropertyConfigMap, } from "@common/guards/config-map"
import { GetParamFrom } from "@common/guards/helper";

@Injectable()
export class IsAdminGuard implements CanActivate {

    constructor(
        private reflector: Reflector,
[]    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const input = this.reflector.get<PropertyConfigMap>(AppGuardOptions, context.getHandler())

        const ctx = context.switchToHttp();
        const req: Request = ctx.getRequest<Request>();

        const accessToken: string | undefined = await GetParamFrom.request(
            input?.isAdminGuard?.paramName ?? "adminToken", 
            input?.isAdminGuard?.propertyAccess ?? "headers", req)

        if(accessToken !== process.env.ADMIN_TOKEN) throw new InvalidTokenError()

        return true 
    }

}

export namespace IsAdminGuard {

    export type Input = PropertyConfig & {}
}