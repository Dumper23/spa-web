import { Resolver, Query } from 'type-graphql';
import { User } from '../Entities/User';
import { UserType } from '../Types/User';
import { AppDataSource } from '../DataSource';

@Resolver()
export class UserResolver {
  @Query(() => [UserType])
  async getAllUsers(): Promise<UserType[]> {
    const userRepository = await AppDataSource.getRepository(User);
    return await userRepository.find(); // Fetch all users
  }
}
