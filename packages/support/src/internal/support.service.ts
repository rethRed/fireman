import { Injectable } from "@nestjs/common";
import { Either, failure, success } from "@common/logic";
import { DomainError } from "@common/errors";
import { TypeORM } from "@common/providers/typeorm";

import { InvalidTokenError } from "@auth/@public-infra/guards/errors";
import { SupportEntity } from "./support.entity";
import { UserNotFoundError } from "./errors";

@Injectable()
export class SupportService {

    async becomeSupport(userId: string, fullname: string): Promise<Either<DomainError, void>> {
        const user = await TypeORM.em.findOneBy(SupportEntity, {
            id: userId
        })
        if(!user) return failure(new UserNotFoundError())

        const becomeSupportResult = user.becomeSupport({ fullname })
        if(becomeSupportResult.isFailure()) return becomeSupportResult

        await TypeORM.em.save(user)

        return success(undefined)
    }

    async updateSupport(userId: string, fullname: string): Promise<Either<DomainError, void>> {
        const user = await TypeORM.em.findOneBy(SupportEntity, {
            id: userId
        })
        if(!user) return failure(new UserNotFoundError())

        const updateSupportResult = user.updateSupport({ fullname })
        if(updateSupportResult.isFailure()) return updateSupportResult

        await TypeORM.em.save(user)

        return success(undefined)
    }
}
