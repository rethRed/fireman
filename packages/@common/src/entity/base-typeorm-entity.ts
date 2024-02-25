import { Entity, VersionColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, PrimaryColumn, } from "typeorm"
import { v4 as uuidV4 } from "uuid"
import { Either, failure, success } from "../logic"
import { DomainError } from "../errors"
import { ClassValidatorProvider } from "../providers/validators"


class Base {


    @CreateDateColumn({ name: "created_at" })
    createdAt!: Date

    @UpdateDateColumn({ name: "updated_at" })
    updatedAt!: Date

    @DeleteDateColumn({ name: "deleted_at" })
    deletedAt!: Date

    assignProperties(props: any) {
        if (typeof props === "object") {
            delete props.version
            delete props.id
            delete props.createdAt
            delete props.updatedAt
            delete props.deletedAt
            Object.assign(this, props)
        }
    }

    validateAllPropertities(): Either<DomainError, void> {

        const validationResult = ClassValidatorProvider.validateAll(this)
        if (validationResult.isFailure()) return failure(validationResult.value)

        return success(undefined)
    }

    validateProperties(propertyNames: (keyof this)[]): Either<DomainError, void> {

        const validationResult = ClassValidatorProvider.validateProperties(this, propertyNames as any)
        if (validationResult.isFailure()) return failure(validationResult.value)

        return success(undefined)
    }

    validateAllPropertiesExcept(propertyNames: (keyof this)[]): Either<DomainError, void> {
        const validationResult = ClassValidatorProvider.validateAllPropertiesExcept(this, propertyNames as any)
        if (validationResult.isFailure()) return failure(validationResult.value)

        return success(undefined)
    }


}

class WithVersionAndId extends Base {
    @VersionColumn()
    version!: number

    @PrimaryColumn({ name: "id", length: 50 })
    id: string = uuidV4()
}

class WithId extends Base {
    @PrimaryColumn({ name: "id", length: 50 })
    id: string = uuidV4()
}

class WithVersion extends Base {
    @VersionColumn()
    version!: number
}

type OptionsInput = {
    withId?: boolean
    withVersion?: boolean
}

type ResultType<T extends OptionsInput> = 
    T extends { withId: true; withVersion: true } ? typeof WithVersionAndId :
    T extends { withId: true } ? typeof WithId :
    T extends { withId: false; withVersion: true } ? typeof WithVersion :
    T extends { withId: true, withVersion: false } ? typeof WithId :
    T extends { withVersion: false } ? typeof WithId :
    T extends { withId: false } ? typeof WithVersion :
    T extends { withVersion: true } ? typeof WithVersion :
    T extends {} ? typeof WithVersionAndId :
    typeof Base;

export function BaseTypeormEntity<T extends OptionsInput>(options?: T): ResultType<T> {
    const { withId = true, withVersion = true } = options ?? {};

    if (withId === true && withVersion === true) {
        return WithVersionAndId  as ResultType<T>
    } else if (withId) {
        return WithId as ResultType<T>
    } else if (withVersion) {
        return WithVersion as ResultType<T>
    } else {
        return Base as ResultType<T>
    }
}


