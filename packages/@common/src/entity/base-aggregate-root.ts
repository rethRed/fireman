import { BaseEntity } from "./base-entity";
import { IdValueObject } from "./id.value-object";

export abstract class BaseAggregateRoot<TProps> extends BaseEntity<TProps> {
    constructor(props: TProps, id?: IdValueObject, createdAt?: Date, updatedAt?: Date, version?: number){
        super(props, id, createdAt, updatedAt, version)
    }

    public equals(ar?: BaseAggregateRoot<TProps>): boolean {
        if (ar === null || ar === undefined) {
            return false
        }
        if (ar._id === undefined) {
            return false
        }
        return this._id.equals(ar._id)
    }

    public getProps(): TProps {
        return this._props
    }

    public getCreatedAt(): Date {
        return this._createdAt
    }

    public getUpdatedAt(): Date {
        return this._updatedAt
    }

    public getVersion(): number {
        return this._version
    }

    abstract toJSON(): Record<string, any> 

    toJSONBase(): BaseAggregateRoot.BasePropsJSON {
        return {
            id: this._id.getProps().id,
            createdAt: this._createdAt.toISOString(),
            updatedAt: this._updatedAt.toISOString(),
            version: this._version
        }
    }
}

export namespace BaseAggregateRoot {

    export type BasePropsJSON = {
        id: string
        createdAt: string
        updatedAt: string
        version: number
    }
}
