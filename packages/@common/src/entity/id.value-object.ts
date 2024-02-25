import { TypeAssurer } from "@common/utils";
import { BaseValueObject } from "@common/value-objects";
import { randomUUID } from "crypto";

export class IdValueObject extends BaseValueObject<{ id: string }> {
    constructor(id?: string) {
        id = TypeAssurer.assureString(id)
        if (id === "") id = randomUUID()
        super({ id })
    }

    static from(props: string): IdValueObject {
        return new IdValueObject(props)
    }

    get value(): string {
        return this.getProps().id
    }


}
