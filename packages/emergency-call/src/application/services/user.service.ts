import { IdValueObject } from "@common/entity/id.value-object";
import { DomainError } from "@common/errors";
import { Either, failure, success } from "@common/logic";
import { EmergencyCallAggregate } from "@emergency-call/domain/entity";
import { UserIdValueObject } from "@emergency-call/domain/entity/value-objects";
import { IEmergencyCallRepository } from "@emergency-call/domain/repositories";
import { IUserService } from "@emergency-call/domain/services"
import { EmergencyCallNotFoundError } from "./errors";

export class UserService implements IUserService {

    constructor(
        private readonly emergencyCallRepository: IEmergencyCallRepository
    ){}

    async triggerEmergencyCall(userId: string): Promise<Either<DomainError, void>> {
        
        const userIdValueObject = UserIdValueObject.create(userId)
        if(userIdValueObject.isFailure()) return failure(userIdValueObject.value)

        const emergencyCallAggregate = EmergencyCallAggregate.trigger({
            userId: userIdValueObject.value
        })
        if(emergencyCallAggregate.isFailure()) return failure(emergencyCallAggregate.value)

        await this.emergencyCallRepository.create(emergencyCallAggregate.value)

        return success(undefined)

    }

    async cancelEmergencyCall(emergencyCallId: string): Promise<Either<DomainError, void>> {
        const emergencyCallIdValueObject = IdValueObject.from(emergencyCallId)

        const emergencyCallAggregate= await this.emergencyCallRepository.findById(emergencyCallIdValueObject)
        if(!emergencyCallAggregate) return failure(new EmergencyCallNotFoundError())

        const cancellResult = emergencyCallAggregate.cancelEmergencyCall()
        if(cancellResult.isFailure()) return failure(cancellResult.value)

        await this.emergencyCallRepository.update(emergencyCallAggregate)

        return success(undefined)
    }

}
