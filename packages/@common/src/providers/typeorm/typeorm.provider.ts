import { join } from 'path';
import { DataSource, EntityManager } from 'typeorm';
import { DataSourceOptions } from "typeorm"

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




export class TypeORM {
    
    private static _value: DataSource;
    
    static async init() {
        const dbInfo = getDbInfoFromUrl(process.env.MYSQL_DATABASE_URL!);
        
        const appDataSource = new DataSource({
            type: 'mysql',
            host: dbInfo.host,
            port: dbInfo.port,
            username: dbInfo.user,
            password: dbInfo.password,
            database: dbInfo.dbName,
            entities: [
                join(__dirname,"../../../../", '**', '*.entity.{ts,js}')
            ],
            synchronize: false,
            subscribers: [
                
            ],
            charset: "utf8mb4",
        })
        
        await appDataSource.initialize()

        console.log("TypeORM initialized",);

        this._value = appDataSource;
    }

    static get em(): EntityManager {
        return this._value.manager;
    }

    static get dataSource(): DataSource {
        return this._value;
    }

    static executeWhenInited(callback: () => any) {
        if (this._value) {
            return callback();
        }
        return new Promise((resolve) => {
            const interval = setInterval(() => {
                if (this._value) {
                    clearInterval(interval);
                    resolve(callback());
                }
            }, 50)
        });
    }
}
