import { buildSchema } from 'type-graphql';
import { UserResolver } from './Queries/User'; // Import your User resolver
import { UserMutation } from './Mutations/User';
import { AuthResolver } from './Queries/Auth';

// Export a function to build the schema
export const createSchema = async () => {
    return buildSchema({
        resolvers: [UserResolver, AuthResolver, UserMutation], // Register resolvers here
    });
};
