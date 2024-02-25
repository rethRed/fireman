

import { Request, Response } from "express";
import { PropertyConfig } from "./config-map";


function camelCaseToSnakeCase(input: string): string {
    return input.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase();
}


export class GetParamFrom {

    static async headers(paramName: string, request: Request): Promise<string | undefined> {
        const paramNameToHeaders = camelCaseToSnakeCase(paramName)
        return request.headers[paramNameToHeaders] as any ?? ""
    }

    static async body(paramName: string, request: Request): Promise<string | undefined> {
        return request.body?.[paramName]
    }

    static async params(paramName: string, request: Request): Promise<string | undefined> {
        return request.params?.[paramName]
    }

    static async query(paramName: string, request: Request): Promise<string | undefined> {
        return request.query?.[paramName] as any
    }

    static async cookies(paramName: string, request: Request): Promise<string | undefined> {
        return request.cookies?.[paramName]
    }

    static async request(paramName: string, place: GetParamFrom.ParamsPlaces, request: Request): Promise<string | undefined> {
        return GetParamFrom[place!](paramName, request)
    }

}

export namespace GetParamFrom {

    export type ParamsPlaces = PropertyConfig["propertyAccess"]
}