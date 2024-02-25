import { AbortTransactionError } from "../application/errors";


export class AbortTransactionDecorator {

    static async handle(callback: () => any) {
            try {
                return await callback() 
            }catch(err) {

                if(err instanceof AbortTransactionError){
                    return err.failureValue
                }
                throw err
            }
        
}
    
}