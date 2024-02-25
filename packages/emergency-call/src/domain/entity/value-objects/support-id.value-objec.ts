import { DomainError } from "@common/errors";
import { Either, failure, success } from "@common/logic";
import { BaseValueObject } from "@common/value-objects";
import { InvalidIdError } from "../errors";

export class SupportIdValueObject extends BaseValueObject<string> {
    constructor(props: string) {
        super(props)
    }

    public static create(props: string): Either<DomainError, SupportIdValueObject > {
        if(typeof props !== 'string') return failure(new InvalidIdError())
        return success(new SupportIdValueObject(props))
    }
}