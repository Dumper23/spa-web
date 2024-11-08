import { buildSchema } from 'type-graphql';
import { UserResolver } from './Queries/User'; // Import your User resolver
import { UserMutation } from './Mutations/User';

// Export a function to build the schema
export const createSchema = async () => {
    return buildSchema({
        resolvers: [UserResolver, UserMutation], // Register resolvers here
    });
};
