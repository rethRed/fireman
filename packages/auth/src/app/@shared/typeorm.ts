import { join } from 'path';
import { DataSource, EntityManager } from 'typeorm';
import { TypeOrmFactory } from "@fireman/common/providers-typeorm"
import { UserEntity } from '../user.entity';


export class TypeORM {
    
    private static _value: DataSource;
    
    static async init() {
        const appDataSource = TypeOrmFactory.createDataSource({
            entities: [
                UserEntity
            ],
        })
        await appDataSource.initialize()
        
        this._value = appDataSource;
    }

    static get em(): EntityManager {
        return this._value.manager;
    }

    static get dataSource(): DataSource {
        return this._value;
    }


}