import { Resolver, Query, Arg } from 'type-graphql';
import { User } from '../Entities/User';
import { AppDataSource } from '../DataSource';
import bcrypt from 'bcryptjs';
import { USER_NOT_FOUND_ERROR } from '../Constants/Constants';
import { LOGIN_PASSWORD_ERROR } from '../Constants/Constants';
import jwt from 'jsonwebtoken';

@Resolver()
export class AuthResolver {

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

    //Public end-point, consider adding a maximum request check
    @Query(() => Boolean)
        async validateToken( @Arg('token') token: string ): Promise<boolean> {
        if (!token) {
        return false;
        }

        try {
            jwt.verify(token, process.env.JWT_SECRET!);
            return true;
        } catch (error) {
            return false;
        }
    }
}