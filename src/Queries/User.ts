import { Resolver, Query, Arg } from 'type-graphql';
import { User } from '../Entities/User';
import { UserType } from '../Types/User';
import { AppDataSource } from '../DataSource';
import bcrypt from 'bcryptjs';
import { LOGIN_DNI_ERROR, USER_NOT_FOUND_ERROR } from '../Constants/Constants';
import { LOGIN_PASSWORD_ERROR } from '../Constants/Constants';
import jwt from 'jsonwebtoken';


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

  @Query(() => String)
async login(
  @Arg('dni') dni: string,
  @Arg('password') password: string
): Promise<string> {
  const userRepository = await AppDataSource.getRepository(User);

  const user = await userRepository.findOne({
    where: {
      Dni: dni,
    }
  });

  if (!user) {
    throw new Error(USER_NOT_FOUND_ERROR);
  }

  const isMatch = await bcrypt.compare(password, user.Password);
  if (!isMatch) {
    throw new Error(LOGIN_PASSWORD_ERROR);
  }

  const token = jwt.sign({ name: user.Name, dni: user.Dni }, process.env.JWT_SECRET!, { expiresIn: '1h' });

  return token; 
}

}
