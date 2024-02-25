import { OptimisticLockError } from "../application/errors";
import {  OptimisticLockVersionMismatchError as TypeOrmOptimisticLockError } from "typeorm"

export class OptimisticLockDecorator {

    static async handle(callback: () => any) {

        while(true){
            try {
                return await callback() 
            }catch(err) {

                if(err instanceof OptimisticLockError){
                    continue
                }

                if(err instanceof TypeOrmOptimisticLockError){
                    continue
                }

                throw err
            }
        }
}
    
}