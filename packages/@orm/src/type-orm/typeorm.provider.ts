import { join } from 'path';
import { DataSource, EntityManager } from 'typeorm';
import { authTypeormEntities } from "@fireman/auth/@public-infra"

type DbInfoInterface = {
    host: string
    port: number
    user: string
    password: string
    dbName: string
}


function getDbInfoFromUrl(dbUrl: string): DbInfoInterface {
    const url = new URL(dbUrl);
    return {
      host: url.hostname,
      port: Number(url.port),
      user: url.username,
      password: url.password,
      dbName: url.pathname.split('/')[1]
    };
}

const dbInfo = getDbInfoFromUrl(process.env.MYSQL_DATABASE_URL!);


type InitInput = {
    synchronize?: boolean

}
console.log(authTypeormEntities)
///d
export class TypeORM {
    
    private static _value: DataSource;
    
    static async init(input?: InitInput) {
        const appDataSource = new DataSource({
            type: 'mysql',
            host: dbInfo.host,
            port: dbInfo.port,
            username: dbInfo.user,
            password: dbInfo.password,
            database: dbInfo.dbName,
            entities: [ ...authTypeormEntities ],
            synchronize: false,
            subscribers: [],
            charset: "utf8mb4",
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


