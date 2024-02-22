import { validateSync, ValidateBy } from "class-validator";
import { Either, failure, success } from "../../logic";
import { DomainError } from "../../errors";

class ClassValidatorDomainError extends DomainError {

    constructor(errorName: string){
        super("")
        this.name = errorName
    }
}

export class ClassValidatorAdapter {
    static toDomainError(stringError: string): DomainError  {
       const classValidatorDomainError = new ClassValidatorDomainError(stringError)
        return classValidatorDomainError
    }
}


export class ClassValidatorProvider {

    static validateAll<T extends object>(entity: T): Either<DomainError, string> {
        const errors = validateSync(entity);
        if (errors.length > 0) {
            let error = errors[0];
            if(error.children![0]) error = error.children![0];

            const firstConstraintKey = Object.keys(error.constraints!)[0];
            const name = error.constraints![firstConstraintKey];
            return failure(ClassValidatorAdapter.toDomainError(name));
        }
        return success();
    }

    static validateProperties<T extends object>(entity: T, propertyNames: string[]): Either<DomainError, string> {

        const errors = validateSync(entity, );

        for (const err of errors) {
            if(!propertyNames.includes(err.property)) continue;
            const error = errors[0];
            const firstConstraintKey = Object.keys(error.constraints!)[0];
            const name = error.constraints![firstConstraintKey];
            return failure(ClassValidatorAdapter.toDomainError(name));
        }

        return success();
    }

    static validateAllPropertiesExcept<T extends object>(entity: T, propertyNames: string[]): Either<DomainError, string> {
        
        const errors = validateSync(entity);

        for (const err of errors) {
            if(propertyNames.includes(err.property)) continue;
            const error = errors[0];
            const firstConstraintKey = Object.keys(error.constraints!)[0];
            const name = error.constraints![firstConstraintKey];
            return failure(ClassValidatorAdapter.toDomainError(name));
        }

        return success();
    }
}
