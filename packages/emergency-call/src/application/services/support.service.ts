import { IdValueObject } from "@common/entity/id.value-object";
import { DomainError } from "@common/errors";
import { Either, failure, success } from "@common/logic";
import { IEmergencyCallRepository } from "@emergency-call/domain/repositories";
import { ISupportService } from "@emergency-call/domain/services";
import { EmergencyCallNotFoundError } from "./errors";
import { SupportIdValueObject } from "@emergency-call/domain/entity/value-objects";

export class SupportService implements ISupportService {

    constructor(
        private readonly emergencyCallRepository: IEmergencyCallRepository
    ){}

    async assumeEmergencyCall(emergencyCallId: string): Promise<Either<DomainError, void>> {
        const emergencyCallIdValueObject = IdValueObject.from(emergencyCallId)

        const emergencyCallAggregate= await this.emergencyCallRepository.findById(emergencyCallIdValueObject)
        if(!emergencyCallAggregate) return failure(new EmergencyCallNotFoundError())
    
        const supportIdValueObject = SupportIdValueObject.create(emergencyCallId)
        if(supportIdValueObject.isFailure()) return failure(supportIdValueObject.value)

        const assumeResult = emergencyCallAggregate.assumeEmergencyCall(supportIdValueObject.value)   
        if(assumeResult.isFailure()) return failure(assumeResult.value)
        
        await this.emergencyCallRepository.update(emergencyCallAggregate)

        return success(undefined)
    }
    
    async finishEmergencyCall(emergencyCallId: string): Promise<Either<DomainError, void>> {
        const emergencyCallIdValueObject = IdValueObject.from(emergencyCallId)

        const emergencyCallAggregate = await this.emergencyCallRepository.findById(emergencyCallIdValueObject)
        if(!emergencyCallAggregate) return failure(new EmergencyCallNotFoundError())

        const finishResult = emergencyCallAggregate.finishEmergencyCall()
        if(finishResult.isFailure()) return failure(finishResult.value)

        await this.emergencyCallRepository.update(emergencyCallAggregate)

        return success(undefined)
    }

    async requestFireFightersForEmergency(emergencyCallId: string): Promise<Either<DomainError, void>> {
        const emergencyCallIdValueObject = IdValueObject.from(emergencyCallId)

        const emergencyCallAggregate = await this.emergencyCallRepository.findById(emergencyCallIdValueObject)
        if(!emergencyCallAggregate) return failure(new EmergencyCallNotFoundError())

        const requestResult = emergencyCallAggregate.requestFireFightersForEmergency()
        if(requestResult.isFailure()) return failure(requestResult.value)

        await this.emergencyCallRepository.update(emergencyCallAggregate)

        return success(undefined)
    }

    async cancelEmergencyCall(emergencyCallId: string): Promise<Either<DomainError, void>> {
        const emergencyCallIdValueObject = IdValueObject.from(emergencyCallId)

        const emergencyCallAggregate = await this.emergencyCallRepository.findById(emergencyCallIdValueObject)
        if(!emergencyCallAggregate) return failure(new EmergencyCallNotFoundError())

        const cancellResult = emergencyCallAggregate.cancelEmergencyCall()
        if(cancellResult.isFailure()) return failure(cancellResult.value)

        await this.emergencyCallRepository.update(emergencyCallAggregate)

        return success(undefined)
    }
    
}
