import express from 'express';
import dotenv from 'dotenv';
import { createHandler, HandlerOptions } from 'graphql-http/lib/use/express';
import { createSchema } from './Schema'; // Import the schema
import cors from 'cors';
import { AppDataSource } from './DataSource';


// Define the server function
const startServer = async() => {
  await dotenv.config();
  const app = await express();
  await app.use(cors());
  await app.use(express.json());
  

  AppDataSource.initialize()
    .then(async() => {
       // TypeScript expects a schema of type GraphQLSchema
      const schema = await createSchema();
      const options: HandlerOptions = { schema }; // Specify the schema here

      await app.use('/graphql', createHandler(options));

      // const port = 3000;
      // const host = 'localhost';

      const port = process.env.DB_PORT || '3000';
      const host = process.env.SERVER_HOST || '0.0.0.0';

      app.listen(parseInt(port), host, () => {
        console.log(`Server is running on ${host}:${port} pointing to database ${process.env.DB_NAME} hosted on: ${process.env.DB_HOST}`);
      });
    })
    .catch((err) => console.error('Database connection error:', err));
};

// Start the server
startServer();
