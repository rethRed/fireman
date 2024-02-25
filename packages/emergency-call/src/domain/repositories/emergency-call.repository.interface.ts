import { IdValueObject } from "@common/entity/id.value-object";
import { EmergencyCallAggregate } from "../entity";


export interface IEmergencyCallRepository {
    findById(id: IdValueObject): Promise<EmergencyCallAggregate | null>
    create(emergencyCall: EmergencyCallAggregate): Promise<void>
    delete(emergencyCall: EmergencyCallAggregate): Promise<void>
    update(emergencyCall: EmergencyCallAggregate): Promise<void>
}
