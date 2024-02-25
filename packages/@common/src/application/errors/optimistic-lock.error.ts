import { DomainError } from "@common/errors";

export class OptimisticLockError extends DomainError {
    constructor(){
        super("")
    }
}