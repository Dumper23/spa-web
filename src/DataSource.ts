import { User } from "./Entities/User";
import { DataSource } from "typeorm";
import dotenv from 'dotenv';


export const AppDataSource = new DataSource({
    type: 'mysql',
    database: process.env.DB_NAME || 'b9kpqu4lkqmw9crdieym',
    username: process.env.DB_USER || 'uilsb3gwjphb6sgs',
    password: process.env.DB_PASSWORD || 'LeoYchgF00xMrIEirs8w',
    port: parseInt(process.env.DB_PORT!) || 3306,
    host: process.env.DB_HOST || 'b9kpqu4lkqmw9crdieym-mysql.services.clever-cloud.com',
    logging: true,
    synchronize: false, // Change to false in production
    entities: [User],
    cache: true
  })