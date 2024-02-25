import { DomainError } from "@common/errors";
import { Either } from "@common/logic";

export interface ISupportService {
    assumeEmergencyCall(emergencyCallId: string, supportId: string): Promise<Either<DomainError, void>>
    finishEmergencyCall(emergencyCallId: string): Promise<Either<DomainError, void>>
    requestFireFightersForEmergency(emergencyCallId: string): Promise<Either<DomainError, void>>
    cancelEmergencyCall(emergencyCallId: string): Promise<Either<DomainError, void>>
}
