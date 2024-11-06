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
    const userRepository = AppDataSource.getRepository(User);

    //Checking if user already exists!
    const existingUser = await userRepository.findOne({ where: { Dni: dni} });
    if (existingUser) {
      throw new Error('User with this DNI already exists.');
    }else{
    
      const user = userRepository.create({
        Name: name,
        MiddleName: middleName,
        LastName: lastName,
        Dni: dni,
        Adult: adult,
      });

      await userRepository.save(user);
      return user;
    }
  }
}
