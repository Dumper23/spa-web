import express from 'express';
import dotenv from 'dotenv';
import { createHandler, HandlerOptions } from 'graphql-http/lib/use/express';
import { createSchema } from './Schema'; // Import the schema
import cors from 'cors';
import { createConnection } from 'typeorm';
import { User } from './Entities/User';
import { AppDataSource } from './DataSource';


// Define the server function
const startServer = () => {
  dotenv.config();

  AppDataSource.initialize()
    .then(async() => {
      const app = express();
      app.use(cors());
      app.use(express.json());

      // TypeScript expects a schema of type GraphQLSchema
      const schema = await createSchema();
      const options: HandlerOptions = { schema }; // Specify the schema here

      app.use('/graphql', createHandler(options));

      app.listen(process.env.SERVER_PORT || 3000, () => {
        console.log(`Server is running on ${process.env.SERVER_HOST || 'https://spa-web.onrender.com'}:${process.env.SERVER_PORT || 3000}`);
      });
    })
    .catch((err) => console.error('Database connection error:', err));
};

// Start the server
startServer();
