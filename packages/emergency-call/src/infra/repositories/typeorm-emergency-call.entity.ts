import { BaseTypeormEntity } from "@common/entity";
import { IdValueObject } from "@common/entity/id.value-object";
import { EmergencyCallAggregate } from "@emergency-call/domain/entity";
import { SupportIdValueObject, UserIdValueObject } from "@emergency-call/domain/entity/value-objects";
import { Column, EntitySchema } from "typeorm"



export class TypeormEmergencyCallEntity extends BaseTypeormEntity() {

    @Column({ type: "enum", enum: EmergencyCallAggregate.StatusEnumValue  })
    status!: EmergencyCallAggregate.StatusEnum

    @Column()
    userId!: string

    @Column({ nullable: true })
    supportId?: string

    @Column({ type: "boolean" })
    isFirefighterRequestOpened!: boolean

    toDomain(): EmergencyCallAggregate {
        const props: EmergencyCallAggregate.Props = {
            userId: new UserIdValueObject(this.userId),
            status: this.status,
            supportId: this.supportId ? new SupportIdValueObject(this.supportId) : undefined,
            isFirefighterRequestOpened: this.isFirefighterRequestOpened
        }

        return new EmergencyCallAggregate(props, IdValueObject.from(this.id), this.createdAt, this.updatedAt, this.version)
    }

    static toPersistence(aggregate: EmergencyCallAggregate): TypeormEmergencyCallEntity {
        const props = aggregate.toJSON()
        const entity = new TypeormEmergencyCallEntity()
        entity.id = props.id
        Object.assign(entity, props)
        return entity
    }

}