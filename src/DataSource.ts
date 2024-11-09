import { User } from "./Entities/User";
import { DataSource } from "typeorm";


export const AppDataSource = new DataSource({
    type: 'mysql',
    database: 'b9kpqu4lkqmw9crdieym',
    username: 'uilsb3gwjphb6sgs',
    password: 'LeoYchgF00xMrIEirs8w',
    port: 3306,
    host: 'b9kpqu4lkqmw9crdieym-mysql.services.clever-cloud.com',
    logging: true,
    synchronize: false,
    entities: [User],
    cache: true
  })