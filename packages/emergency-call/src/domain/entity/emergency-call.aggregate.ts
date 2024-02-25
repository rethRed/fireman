import { BaseEntity } from "@common/entity"
import { BaseAggregateRoot } from "@common/entity/base-aggregate-root"
import { IdValueObject } from "@common/entity/id.value-object"
import { DomainError } from "@common/errors"
import { Either, failure, success } from "@common/logic"
import { SupportIdValueObject, UserIdValueObject } from "./value-objects"
import { 
    EmergencyCallIsAlreadyCancelledError,
    EmergencyCallIsAlreadyFinishedError,
    EmergencyCallIsAlreadyHasSupportError,
    EmergencyCallIsAlreadyInAttendanceError, 
    EmergencyCallIsNotInAttendanceError, 
    FirefighterRequestAlreadyOpenedError, 
    InvalidUserIdError 
} from "./errors"

const StatusEnum = {
    WAITING_SUPPORT: 'WAITING_SUPPORT',
    IN_ATTENDANCE: 'IN_ATTENDANCE',
    CANCELLED: 'CANCELLED',
    FINISHED: 'FINISHED'
} as const

export class EmergencyCallAggregate extends BaseAggregateRoot<EmergencyCallAggregate.Props> {

    constructor(props: EmergencyCallAggregate.Props, id?: IdValueObject, createdAt?: Date, updatedAt?: Date, version?: number){
        super(props, id, createdAt, updatedAt, version)
    }

    static trigger(props: EmergencyCallAggregate.Input): Either<DomainError, EmergencyCallAggregate> {

        if(!(props.userId instanceof UserIdValueObject)) return failure(new InvalidUserIdError())

        const emergencyCallEntity = new EmergencyCallAggregate({
            userId: props.userId,
            status: StatusEnum.WAITING_SUPPORT,
            supportId: undefined,
            isFirefighterRequestOpened: false
        })

        return success(emergencyCallEntity)
    }

    requestFireFightersForEmergency(): Either<DomainError, void> {
        if(!this.isInAttendance()) return failure(new EmergencyCallIsNotInAttendanceError())
        if(this.isFirefighterRequestOpened()) return failure(new FirefighterRequestAlreadyOpenedError())
        this._props.isFirefighterRequestOpened = true
        return success(undefined)
    }

    assumeEmergencyCall(supportId: SupportIdValueObject): Either<DomainError, void> {
        if(this.hasSupport()) return failure(new EmergencyCallIsAlreadyHasSupportError())
        if(!this.isWaitingSupport()) return failure(new EmergencyCallIsAlreadyInAttendanceError())
        this._props.status = StatusEnum.IN_ATTENDANCE
        this._props.supportId = supportId
        return success(undefined)
    }

    finishEmergencyCall(): Either<DomainError, void> {
        if(this.isFinished()) return failure(new EmergencyCallIsAlreadyFinishedError())
        if(!this.isInAttendance()) return failure(new EmergencyCallIsNotInAttendanceError())
        this._props.status = StatusEnum.FINISHED
        return success(undefined)
    }

    cancelEmergencyCall(): Either<DomainError, void> {
        if(this.isCancelled()) return failure(new EmergencyCallIsAlreadyCancelledError())
        if(this.isFinished()) return failure(new EmergencyCallIsAlreadyFinishedError())
        this._props.status = StatusEnum.CANCELLED
        return success(undefined)
    }

    isFirefighterRequestOpened(): boolean {
        return this._props.isFirefighterRequestOpened
    }

    isWaitingSupport(): boolean {
        return this._props.status === StatusEnum.WAITING_SUPPORT
    }

    isInAttendance(): boolean {
        return this._props.status === StatusEnum.IN_ATTENDANCE
    }

    isCancelled(): boolean {
        return this._props.status === StatusEnum.CANCELLED
    }

    isFinished(): boolean {
        return this._props.status === StatusEnum.FINISHED
    }

    hasSupport(): boolean {
        return !!this._props.supportId
    }

    toJSON(): EmergencyCallAggregate.PropsJSON {
        return {
            ...this.toJSONBase(),
            status: this._props.status,
            userId: this._props.userId.getProps(),
            supportId: this._props.supportId?.getProps(),
            isFirefighterRequestOpened: this._props.isFirefighterRequestOpened
        }
    }
}

export namespace EmergencyCallAggregate {

    export type StatusEnum = keyof typeof StatusEnum
    export const StatusEnumValue = StatusEnum

    export type Input = {
        userId: UserIdValueObject
    }

    export type Props = {
        userId: UserIdValueObject
        status: StatusEnum
        supportId: SupportIdValueObject | undefined
        isFirefighterRequestOpened: boolean
    }

    export type PropsJSON = Omit<Props, "userId" | "supportId"> &
    {
        userId: string
        supportId: string | undefined
    } & BaseAggregateRoot.BasePropsJSON
}
