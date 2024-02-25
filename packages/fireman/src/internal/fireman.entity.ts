import { IsBoolean, IsEmail, IsString, Length } from "class-validator"
import { randomUUID } from "crypto"
import { Column, Entity } from "typeorm"
import { BaseTypeormEntity } from "@common/entity"
import { Either, failure, success } from "@common/logic"
import { DomainError } from "@common/errors"
import bcrypt from "bcryptjs"
import { UserAlreadyAFiremanError, UserNotAFiremanError } from "./errors"



@Entity("users")
export class FiremanEntity extends BaseTypeormEntity() {

    @Column({ name: "isFireman", default: false, type: "boolean"})
    @IsBoolean()
    isFireman!: boolean


    @Column({ name: "fireman_fullname", nullable: true })
    @IsString()
    @Length(3, 70)
    fullname!: string


    becomeFireman(input: FiremanEntity.UpdateProps): Either<DomainError, void> {
        if(this.isFireman) return failure(new UserAlreadyAFiremanError())
        this.isFireman = true
        this.fullname = input.fullname

        return this.validateAllPropertities()
    }

    update(input: FiremanEntity.UpdateProps): Either<DomainError, void> {
        if(!this.isFireman) return failure(new UserNotAFiremanError())
        this.fullname = input.fullname
        return this.validateAllPropertities()
    }

}


export namespace FiremanEntity {
    
    export type UpdateProps = {
        fullname: string
    }
    
    export type Props = {
        isFireman: boolean
        fullname: string
    }
}
