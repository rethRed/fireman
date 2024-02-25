
import { CanActivate, ExecutionContext, Inject, Injectable } from "@nestjs/common";
import { Request, Response } from "express";
import { Reflector } from "@nestjs/core";
import { UserNotFiremanError,  } from "./errors";
import { AppGuardOptions, PropertyConfig, PropertyConfigMap, } from "@common/guards/config-map"
import { GetParamFrom } from "@common/guards/helper";
import { TypeORM } from "@common/providers/typeorm";
import { FiremanEntity } from "fireman/src/internal/fireman.entity";

@Injectable()
export class IsFiremanGuard implements CanActivate {

    constructor(
        private reflector: Reflector,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {

        const ctx = context.switchToHttp();
        const req: Request = ctx.getRequest<Request>();

        const user = await TypeORM.em.findOneBy(FiremanEntity, {
            id: req.currentUser.id
        })
        if(!user?.isFireman) throw new UserNotFiremanError()
  
        return true
    }

}

export namespace IsFiremanGuard {

    export type Input = PropertyConfig & {}
}