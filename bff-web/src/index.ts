import express from 'express';
import { createHandler } from 'graphql-http/lib/use/express';
import { schema } from './Schema';
import cors from 'cors';
import { createConnection } from "typeorm";
import { Users } from './Entities/Users';


const main = async ()=>{

    await createConnection({
        type: 'mysql',
        database: 'b9kpqu4lkqmw9crdieym',
        username: 'uilsb3gwjphb6sgs',
        password: 'LeoYchgF00xMrIEirs8w',
        port: 3306,
        host: 'b9kpqu4lkqmw9crdieym-mysql.services.clever-cloud.com',
        logging: true,
        synchronize: false,
        entities: [Users]
    });

    const app = express();
    app.use(cors());
    app.use(express.json());

    app.use('/graphql', createHandler({
        schema,
    }));

    app.listen(3001, ()=>{
        console.log("Server running on port: 3001");
    } );

};

main().catch((err)=>console.log(err));
