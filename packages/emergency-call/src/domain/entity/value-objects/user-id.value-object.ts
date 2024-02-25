import { DomainError } from "@common/errors";
import { Either, failure, success } from "@common/logic";
import { BaseValueObject } from "@common/value-objects";
import { InvalidIdError } from "../errors";

export class UserIdValueObject extends BaseValueObject<string> {
    constructor(props: string) {
        super(props)
    }

    public static create(props: string): Either<DomainError, UserIdValueObject > {
        if(typeof props !== 'string') return failure(new InvalidIdError())
        return success(new UserIdValueObject(props))
    }
}