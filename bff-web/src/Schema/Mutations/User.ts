import { GraphQLID, GraphQLString, GraphQLBoolean } from "graphql";
import { UserType } from "../TypeDefs/User";
import { Users } from "../../Entities/Users";
import { MessageType } from "../TypeDefs/Messages";



export const CREATE_USER = {
    type: UserType,
    args: {
        ID: { type: GraphQLID },
        Name: { type: GraphQLString },
        MiddleName: { type: GraphQLString },
        LastName: { type: GraphQLString },
        Dni: { type: GraphQLString },
        Adult:  { type: GraphQLBoolean },
    },
    async resolve(parent: any, args: any){
        await Users.insert(args);
        return args;
    }
}

export const DELETE_USER = {
    type: MessageType,
    args: {
        ID: { type: GraphQLID },
        Dni: { type: GraphQLString },
    },
    async resolve(parent: any, args: any){
        const user = await Users.findOne(args);

        if(!user){
            throw new Error("User does not exist!");
        }

        await Users.delete(args);
        return {
            succesful:true,
            message: 'Delete done'
        };
    }
}

export const UPDATE_NAME = {
    type: MessageType,
    args: {
        ID: { type: GraphQLID },
        oldName: { type: GraphQLString },
        newName: { type: GraphQLString }
    },
    async resolve(parent: any, args: any){
        const user = await Users.findOne(args.ID);
        
        if(!user){
            throw new Error("User does not exist!");
        }

        await Users.update({ID: args.ID}, {Name: args.Name});

        return {
            succesful:true,
            message: 'Update done'
        };
    }
}