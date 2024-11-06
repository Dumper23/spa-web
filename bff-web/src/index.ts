import express from 'express';
import { createHandler, HandlerOptions } from 'graphql-http/lib/use/express';
import { createSchema } from './Schema'; // Import the schema
import cors from 'cors';
import { AppDataSource } from './DataSource';

// Define the server function
const startServer = () => {
  

  AppDataSource.initialize()
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
