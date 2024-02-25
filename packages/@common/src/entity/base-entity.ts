import { IdValueObject } from "./id.value-object"

export abstract class BaseEntity<TProps> {
    _id: IdValueObject
    _props: TProps

    _createdAt: Date
    _updatedAt: Date
    _version: number

    get id(): string {
        return this._id.getProps().id
    }

    constructor(props: TProps, id?: IdValueObject, createdAt?: Date, updatedAt?: Date, version?: number){
        this._props = props
        this._id = id ?? new IdValueObject()
        this._createdAt = createdAt ?? new Date()
        this._updatedAt = updatedAt ?? new Date()
        this._version = version ?? 0
    }
}
