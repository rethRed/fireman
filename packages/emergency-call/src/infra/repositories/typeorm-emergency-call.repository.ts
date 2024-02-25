import { EntityManager, Repository } from "typeorm";
import { IEmergencyCallRepository } from "@emergency-call/domain/repositories"
import { IdValueObject } from "@common/entity/id.value-object";
import { EmergencyCallAggregate } from "@emergency-call/domain/entity";
import { TypeormEmergencyCallEntity } from "./typeorm-emergency-call.entity";

export class TypeormEmergencyCallRepository implements IEmergencyCallRepository{

    private readonly emergencyCallRepository: Repository<TypeormEmergencyCallEntity>

    constructor(
        private readonly em: EntityManager
    ){
        this.emergencyCallRepository = this.em.getRepository(TypeormEmergencyCallEntity)
    }

    async findById(id: IdValueObject): Promise<EmergencyCallAggregate | null> {
        const emergencyCall = await this.emergencyCallRepository.findOneBy({
            id: id.value
        })
        return emergencyCall?.toDomain() ?? null
    }
    async create(emergencyCall: EmergencyCallAggregate): Promise<void> {
        const entity = TypeormEmergencyCallEntity.toPersistence(emergencyCall)
        await this.emergencyCallRepository.save(entity)
    }
    async delete(emergencyCall: EmergencyCallAggregate): Promise<void> {
        await this.emergencyCallRepository.delete({
            id: emergencyCall.id
        })
    }
    async update(emergencyCall: EmergencyCallAggregate): Promise<void> {
        const entity = TypeormEmergencyCallEntity.toPersistence(emergencyCall)
        await this.emergencyCallRepository.save(entity)
    }


}
