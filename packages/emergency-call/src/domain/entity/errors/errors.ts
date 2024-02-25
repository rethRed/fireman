import { DomainError } from "@common/errors"


export class InvalidIdError extends DomainError {
    constructor() {
        super()
    }
} 


export class InvalidUserIdError extends DomainError {
    constructor() {
        super()
    }
} 


export class FirefighterRequestAlreadyOpenedError extends DomainError {
    constructor() {
        super()
    }
} 

export class EmergencyCallIsNotInAttendanceError extends DomainError {
    constructor() {
        super()
    }
} 


export class EmergencyCallIsAlreadyInAttendanceError extends DomainError {
    constructor() {
        super()
    }
} 
export class EmergencyCallIsAlreadyFinishedError extends DomainError {
    constructor() {
        super()
    }
} 

export class EmergencyCallIsAlreadyCancelledError extends DomainError {
    constructor() {
        super()
    }
} 


export class EmergencyCallIsAlreadyHasSupportError extends DomainError {
    constructor() {
        super()
    }
} 