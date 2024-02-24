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

const dbInfo = getDbInfoFromUrl(process.env.MYSQL_DATABASE_URL!);




export class TypeOrmFactory {
    
    
    static createDataSource(options?: Partial<DataSourceOptions>): DataSource {
        const appDataSource = new DataSource({
            type: 'mysql',
            host: dbInfo.host,
            port: dbInfo.port,
            username: dbInfo.user,
            password: dbInfo.password,
            database: dbInfo.dbName,
            entities: options?.entities ? [ ...options?.entities as any ] : [],
            synchronize: options?.synchronize || false,
            subscribers: options?.subscribers ?  [  ...options?.subscribers as any ] : [],
            charset: "utf8mb4",
        })        
        return appDataSource

    }



}