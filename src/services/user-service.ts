import User from "../db/models/user";
import { IAuthDTO } from "../types/dto/auth-dto";
import { IUser } from "../types/models/user";
import { IUserService } from "../types/services/user-service";
import { AuthServiceImpl } from "./auth-service";

const { v4: uuidv4 } = require('uuid');

export class UserServiceImpl implements IUserService {
    async getUserByEmail(email: string): Promise<IUser> {
        return await User.findOne().where({ email: email });
    }

    async createUser(user: IAuthDTO): Promise<IUser> {
        const authService = new AuthServiceImpl();

        user.password = await authService.hashedPassword(user.password);

        const result = await new User({
            ...user,
            id: uuidv4()
        });
        if (!result) return;

        await result.save();
        return result;
    }
}