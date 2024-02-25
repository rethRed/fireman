import { IsBoolean, IsEmail, IsString, Length } from "class-validator"
import { randomUUID } from "crypto"
import { Column, Entity } from "typeorm"
import { BaseTypeormEntity } from "@common/entity"
import { Either, failure, success } from "@common/logic"
import { DomainError } from "@common/errors"
import bcrypt from "bcryptjs"
import { UserAlreadySupportError, UserNotASupportError } from "./errors"



@Entity("users")
export class SupportEntity extends BaseTypeormEntity() {

    @Column({ name: "isSupport", default: false, type: "boolean"})
    @IsBoolean()
    isSupport!: boolean


    @Column({ name: "support_fullname", nullable: true })
    @IsString()
    @Length(3, 70)
    fullname!: string


    becomeSupport(input: SupportEntity.UpdateProps): Either<DomainError, void> {
        if(this.isSupport) return failure(new UserAlreadySupportError())
        this.isSupport = true
        this.fullname = input.fullname

        return this.validateAllPropertities()
    }

    updateSupport(input: SupportEntity.UpdateProps): Either<DomainError, void> {
        if(!this.isSupport) return failure(new UserNotASupportError())
        this.fullname = input.fullname
        return this.validateAllPropertities()
    }

}


export namespace SupportEntity {
    
    export type UpdateProps = {
        fullname: string
    }
    
    export type Props = {
        isSupport: boolean
        fullname: string
    }
}
