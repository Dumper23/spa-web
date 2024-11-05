import { Resolver, Query } from 'type-graphql';
import { Users } from '../Entities/Users';
import { UserType } from '../Types/User';
import { getRepository } from 'typeorm';

@Resolver()
export class UserResolver {
  @Query(() => [UserType])
  async getAllUsers(): Promise<UserType[]> {
    const userRepository = getRepository(Users);
    return await userRepository.find(); // Fetch all users
  }
}
