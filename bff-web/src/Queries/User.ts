import { Resolver, Query } from 'type-graphql';
import { User } from '../Entities/User';
import { UserType } from '../Types/User';
import { getRepository } from 'typeorm';

@Resolver()
export class UserResolver {
  @Query(() => [UserType])
  async getAllUsers(): Promise<UserType[]> {
    const userRepository = getRepository(User);
    return await userRepository.find(); // Fetch all users
  }
}
