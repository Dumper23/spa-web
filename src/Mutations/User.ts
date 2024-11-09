import { Resolver, Mutation, Arg } from 'type-graphql';
import { User } from '../Entities/User';
import { UserType } from '../Types/User';
import { getRepository } from 'typeorm';
import { AppDataSource } from '../DataSource';
import { REGISTER_EXISTING_USER_ERROR } from '../Constants/Constants';
import bcrypt from 'bcryptjs';

@Resolver()
export class UserMutation {
  @Mutation(() => UserType)
  async createUser(
    @Arg('name') name: string,
    @Arg('middleName', { nullable: true }) middleName: string,
    @Arg('lastName', { nullable: true }) lastName: string,
    @Arg('dni') dni: string,
    @Arg('adult', { defaultValue: false }) adult: boolean,
    @Arg('password') password: string
  ): Promise<UserType> {
    const userRepository = await AppDataSource.getRepository(User);

    //Checking if user already exists!
    const existingUser = await userRepository.findOne({ where: { Dni: dni} });
    if (existingUser) {
      throw new Error(REGISTER_EXISTING_USER_ERROR);
    }else{

      const hashedPassword = await bcrypt.hash(password, 12);
    
      const user = userRepository.create({
        Name: name,
        MiddleName: middleName,
        LastName: lastName,
        Dni: dni,
        Adult: adult,
        Password: hashedPassword
      });

      await userRepository.save(user);
      return user;
    }
  }
}
