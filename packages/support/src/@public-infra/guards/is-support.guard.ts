
import { CanActivate, ExecutionContext, Inject, Injectable } from "@nestjs/common";
import { Request, Response } from "express";
import { Reflector } from "@nestjs/core";
import { UserNotSupportError } from "./errors";
import { AppGuardOptions, PropertyConfig, PropertyConfigMap, } from "@common/guards/config-map"
import { GetParamFrom } from "@common/guards/helper";
import { TypeORM } from "@common/providers/typeorm";
import { SupportEntity } from "@support/internal/support.entity";

@Injectable()
export class IsSupportGuard implements CanActivate {

    constructor(
        private reflector: Reflector,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {

        const ctx = context.switchToHttp();
        const req: Request = ctx.getRequest<Request>();

        const user = await TypeORM.em.findOneBy(SupportEntity, {
            id: req.currentUser.id
        })
        if(!user?.isSupport) throw new UserNotSupportError()
  
        return true
    }

}

export namespace IsSupportGuard {

    export type Input = PropertyConfig & {}
}