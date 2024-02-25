import { Injectable } from "@nestjs/common";
import { Either, failure, success } from "@common/logic";
import { DomainError } from "@common/errors";
import { TypeORM } from "@common/providers/typeorm";

import { InvalidTokenError } from "@auth/@public-infra/guards/errors";
import { UserNotFoundError } from "./errors";
import { FiremanEntity } from "./fireman.entity";

@Injectable()
export class FiremanService {

    async becomeFireman(userId: string, fullname: string): Promise<Either<DomainError, void>> {
        const fireman = await TypeORM.em.findOneBy(FiremanEntity, {
            id: userId
        })
        if(!fireman) return failure(new UserNotFoundError())

        const becomeFiremanResult = fireman.becomeFireman({ fullname })
        if(becomeFiremanResult.isFailure()) return becomeFiremanResult

        await TypeORM.em.save(fireman)

        return success(undefined)
    }

    async update(userId: string, fullname: string): Promise<Either<DomainError, void>> {
        const fireman = await TypeORM.em.findOneBy(FiremanEntity, {
            id: userId
        })
        if(!fireman) return failure(new UserNotFoundError())

        const updateFiremanResult = fireman.update({ fullname })
        if(updateFiremanResult.isFailure()) return updateFiremanResult

        await TypeORM.em.save(fireman)

        return success(undefined)
    }
}
