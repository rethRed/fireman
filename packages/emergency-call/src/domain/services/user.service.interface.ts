import { DomainError } from "@common/errors"
import { Either } from "@common/logic"

export interface IUserService {
    triggerEmergencyCall(userId: string): Promise<Either<DomainError, void>>
    cancelEmergencyCall(emergencyCallId: string): Promise<Either<DomainError, void>>
}
