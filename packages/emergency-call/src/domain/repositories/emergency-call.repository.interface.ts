import { IdValueObject } from "@common/entity/id.value-object";
import { EmergencyCallAggregate } from "../entity";


export interface IEmergencyCallRepository {
    findById(id: IdValueObject): Promise<EmergencyCallAggregate | null>
    create(emergencyCall: EmergencyCallAggregate): Promise<void>
    delete(id: EmergencyCallAggregate): Promise<void>
    update(emergencyCall: EmergencyCallAggregate): Promise<void>
}
