import { DomainError } from "@common/errors";

export class AbortTransactionError extends DomainError {
    constructor(
        readonly failureValue?: any
    ){
        super("")
    }
}