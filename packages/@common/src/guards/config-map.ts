import { AuthGuardInput } from "@auth/@public-infra"
import { Reflector } from "@nestjs/core"

export type PropertyConfig = {
    propertyAccess?: "body" | "params" | "headers" | "query" | "cookies"
    paramName?: string
}

export const AppGuardOptions = Reflector.createDecorator<PropertyConfigMap>()

export type PropertyConfigMap = {


    authGuard?: AuthGuardInput

}