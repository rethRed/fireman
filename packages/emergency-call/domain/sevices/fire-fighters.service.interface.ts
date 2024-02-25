import { DomainError } from "@common/errors"
import { Either } from "@common/logic"

export interface FireFightersServiceInterface {
    respondToEmergency(emergencyCallId: string): Promise<Either<DomainError, void>>
    leaveEmergency(emergencyCallId: string): Promise<Either<DomainError, void>>
}
