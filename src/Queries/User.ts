import { Resolver, Query, Arg, Ctx } from 'type-graphql';
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

  @Query(() => [UserType])
  async getOneUserByDni(
    @Arg('dni') dni: string,
  ): Promise<UserType | null> {
    const userRepository = await AppDataSource.getRepository(User);
    return await userRepository.findOne({
      where: {
        Dni: dni
      }
    });
  }
}
