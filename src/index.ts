import express from 'express';
import dotenv from 'dotenv';
import { createHandler, HandlerOptions } from 'graphql-http/lib/use/express';
import { createSchema } from './Schema'; // Import the schema
import cors from 'cors';
import { AppDataSource } from './DataSource';


// Define the server function
const startServer = async() => {
  const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development';
  await dotenv.config({ path: envFile });

  const app = await express();
  await app.use(cors());
  await app.use(express.json());
  

  AppDataSource.initialize()
    .then(async() => {
      const schema = await createSchema();
      const options: HandlerOptions = { schema };

      await app.use('/graphql', createHandler(options));

      const port = process.env.SERVER_PORT || '3000';
      const host = process.env.SERVER_HOST || '0.0.0.0';

      app.listen(parseInt(port), host, () => {
        console.log(`Server is running on ${host}:${port} pointing to database ${process.env.DB_NAME} hosted on: ${process.env.DB_HOST}`);
      });
    })
    .catch((err) => console.error('Database connection error:', err));
};

// Start the server
startServer();
