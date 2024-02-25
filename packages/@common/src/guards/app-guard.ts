import { CanActivate, Injectable } from "@nestjs/common";
import { PropertyConfigMap } from "./config-map";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@auth/@public-infra";

export { PropertyConfig, PropertyConfigMap } from "./config-map"


function mapUsedGuards<T>(use: boolean | undefined, guard: T, isDefault?: boolean): T | undefined {
    if (use === undefined) return isDefault ? guard : undefined
    if (use === true) return guard
    return undefined
}


export function AppGuard(input?: Partial<Record<keyof PropertyConfigMap, boolean>>): CanActivate[] {
    const guards: Record<keyof PropertyConfigMap, any> = {
        authGuard: mapUsedGuards(input?.authGuard, AuthGuard, true),
    }


    const requiredGuards: CanActivate[] = []
    for (const _guardKey of Object.keys(guards)) {
        const guardKey = _guardKey as keyof PropertyConfigMap
        if (guards[guardKey]) {
            requiredGuards.push(guards[guardKey])
        }
    }

    return requiredGuards
}