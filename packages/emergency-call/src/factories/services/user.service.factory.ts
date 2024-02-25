import { TypeORMDecorator } from "@common/decorators";
import { UserService } from "@emergency-call/application/services";
import { IUserService } from "@emergency-call/domain/services";
import { TypeormEmergencyCallRepository } from "@emergency-call/infra/repositories";
import { EntityManager } from "typeorm";

export class UserServiceFactory {

    @TypeORMDecorator.transaction()    
    static create(em?: EntityManager): IUserService {
        const typeormEmergencyCallRepository = new TypeormEmergencyCallRepository(em!)
        const userService: IUserService = new UserService(typeormEmergencyCallRepository)
        return userService
    }
}
