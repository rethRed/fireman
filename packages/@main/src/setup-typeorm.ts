import { TypeORM } from "@fireman/auth/@public-infra"

export async function setupTypeORM(){
    await TypeORM.init()
}
