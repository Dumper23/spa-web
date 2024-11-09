import { Resolver, Mutation, Arg } from 'type-graphql';
import { User } from '../Entities/User';
import { UserType } from '../Types/User';
import { getRepository } from 'typeorm';
import { AppDataSource } from '../DataSource';

@Resolver()
export class UserMutation {
  @Mutation(() => UserType)
  async createUser(
    @Arg('name') name: string,
    @Arg('middleName', { nullable: true }) middleName: string,
    @Arg('lastName', { nullable: true }) lastName: string,
    @Arg('dni') dni: string,
    @Arg('adult', { defaultValue: false }) adult: boolean
  ): Promise<UserType> {
    const userRepository = await AppDataSource.getRepository(User);

    const user = userRepository.create({
      Name: name,
      MiddleName: middleName,
      LastName: lastName,
      Dni: dni,
      Adult: adult,
    });

    await userRepository.save(user);
    return user; // Return the created user
  }
}
