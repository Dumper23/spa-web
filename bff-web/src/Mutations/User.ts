import { Resolver, Mutation, Arg } from 'type-graphql';
import { Users } from '../Entities/Users';
import { UserType } from '../Types/User';
import { getRepository } from 'typeorm';

@Resolver()
export class UserMutation {
  @Mutation(() => UserType)
  async createUser(
    @Arg('name') name: string,
    @Arg('middleName', { nullable: true }) middleName: string,
    @Arg('lastName') lastName: string,
    @Arg('dni') dni: string,
    @Arg('adult', { defaultValue: false }) adult: boolean
  ): Promise<UserType> {
    const userRepository = getRepository(Users);

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
