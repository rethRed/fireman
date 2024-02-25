import { CanActivate, Injectable } from "@nestjs/common";
import { PropertyConfigMap } from "./config-map";
import { Reflector } from "@nestjs/core";
import { AuthGuard, IsAdminGuard } from "@auth/@public-infra/guards";
import { IsSupportGuard } from "@support/@public-infra/guards"
import { IsFiremanGuard } from "@fireman/@public-infra/guards/is-fireman.guard";

export { PropertyConfig, PropertyConfigMap } from "./config-map"


function mapUsedGuards<T>(use: boolean | undefined, guard: T, isDefault?: boolean): T | undefined {
    if (use === undefined) return isDefault ? guard : undefined
    if (use === true) return guard
    return undefined
}


export function AppGuard(input?: Partial<Record<keyof PropertyConfigMap, boolean>>): CanActivate[] {
    const guards: Record<keyof PropertyConfigMap, any> = {
        authGuard: mapUsedGuards(input?.authGuard, AuthGuard, true),
        isAdminGuard: mapUsedGuards(input?.isAdminGuard, IsAdminGuard, false),
        isSupportGuard: mapUsedGuards(input?.isSupportGuard, IsSupportGuard, false),
        isFiremanGuard: mapUsedGuards(input?.isFiremanGuard, IsFiremanGuard, false),
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