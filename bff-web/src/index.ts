import express from 'express';
import { createHandler, HandlerOptions } from 'graphql-http/lib/use/express';
import { createSchema } from './Schema'; // Import the schema
import cors from 'cors';
import { createConnection } from 'typeorm';
import { Users } from './Entities/Users';

// Define the server function
const startServer = () => {
  createConnection({
    type: 'mysql',
    database: 'b9kpqu4lkqmw9crdieym',
    username: 'uilsb3gwjphb6sgs',
    password: 'LeoYchgF00xMrIEirs8w',
    port: 3306,
    host: 'b9kpqu4lkqmw9crdieym-mysql.services.clever-cloud.com',
    logging: true,
    synchronize: false, // Change to false in production
    entities: [Users],
  })
    .then(async() => {
      const app = express();
      app.use(cors());
      app.use(express.json());

      // TypeScript expects a schema of type GraphQLSchema
      const schema = await createSchema();
      const options: HandlerOptions = { schema }; // Specify the schema here

      app.use('/graphql', createHandler(options));

      app.listen(3001, () => {
        console.log('Server running on port: 3001');
      });
    })
    .catch((err) => console.error('Database connection error:', err));
};

// Start the server
startServer();
