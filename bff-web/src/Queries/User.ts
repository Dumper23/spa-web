import { Resolver, Query } from 'type-graphql';
import { User } from '../Entities/User';
import { UserType } from '../Types/User';
import { getRepository } from 'typeorm';
import { AppDataSource } from '../DataSource';

@Resolver()
export class UserResolver {
  @Query(() => [UserType])
  async getAllUsers(): Promise<UserType[]> {
    const userRepository = AppDataSource.getRepository(User);
    return userRepository.find(); // Fetch all users
  }
}
