import { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLBoolean } from "graphql";

export const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        ID: { type: GraphQLID },
        Name: { type: GraphQLString },
        MiddleName: { type: GraphQLString },
        LastName: { type: GraphQLString },
        Dni: { type: GraphQLString },
        Adult:  { type: GraphQLBoolean },
    })
});