import { TypeORMDecorator } from "@common/decorators";
import { SupportService } from "@emergency-call/application/services";
import { ISupportService } from "@emergency-call/domain/services";
import { TypeormEmergencyCallRepository } from "@emergency-call/infra/repositories";
import { EntityManager } from "typeorm";

export class SupportServiceFactory {

    @TypeORMDecorator.transaction()    
    static create(em?: EntityManager): ISupportService {
        const typeormEmergencyCallRepository = new TypeormEmergencyCallRepository(em!)
        const supportService: ISupportService = new SupportService(typeormEmergencyCallRepository)
        return supportService
    }
}
