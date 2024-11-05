import { buildSchema } from 'type-graphql';
import { UserResolver } from './Queries/User'; // Import your User resolver

// Export a function to build the schema
export const createSchema = async () => {
    return buildSchema({
        resolvers: [UserResolver], // Register resolvers here
    });
};
