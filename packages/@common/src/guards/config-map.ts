import { AuthGuard, IsAdminGuard } from "@auth/@public-infra/guards"
import { IsFiremanGuard } from "@fireman/@public-infra/guards/is-fireman.guard"
import { Reflector } from "@nestjs/core"
import { IsSupportGuard } from "@support/@public-infra/guards"

export type PropertyConfig = {
    propertyAccess?: "body" | "params" | "headers" | "query" | "cookies"
    paramName?: string
}

export const AppGuardOptions = Reflector.createDecorator<PropertyConfigMap>()

export type PropertyConfigMap = {


    authGuard?: AuthGuard.Input
    isAdminGuard?: IsAdminGuard.Input

    isSupportGuard?: IsSupportGuard.Input

    isFiremanGuard?: IsFiremanGuard.Input
}