import { GraphQLList } from "graphql";
import { UserType } from "../TypeDefs/User";
import { Users } from "../../Entities/Users";



export const GET_ALL_USERS = {
    type: new GraphQLList(UserType),
    resolve() { //Make the function resolve be of type Promise<IUser> and create the corresponding interface
        return Users.find();
    }
}