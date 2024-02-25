import { AuthGuard, IsAdminGuard } from "@auth/@public-infra/guards"
import { Reflector } from "@nestjs/core"

export type PropertyConfig = {
    propertyAccess?: "body" | "params" | "headers" | "query" | "cookies"
    paramName?: string
}

export const AppGuardOptions = Reflector.createDecorator<PropertyConfigMap>()

export type PropertyConfigMap = {


    authGuard?: AuthGuard.Input
    isAdminGuard?: IsAdminGuard.Input
}