import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { GET_ALL_USERS } from "./Queries/User";
import { CREATE_USER, DELETE_USER, UPDATE_NAME } from "./Mutations/User";


const RootQuery = new GraphQLObjectType({
    name: 'Rootquery',
    fields: { 
        getAllUsers: GET_ALL_USERS
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        createUser: CREATE_USER, 
        deleteUser: DELETE_USER,
        updateName: UPDATE_NAME
    }
});




export const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});