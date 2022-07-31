import User from "../db/models/user";
import { IUserDTO } from "../types/dto/user-dto";
import { IAuthService } from "../types/services/auth-service";
import { IUserService } from "../types/services/user-service";
import { AuthServiceImpl } from "./auth-service";

const { v4: uuidv4 } = require('uuid');

export class UserServiceImpl implements IUserService {
    async getUserByEmail(email: string): Promise<IUserDTO> {
        return await User.findOne().where({ email: email });
    }

    async createUser(user: IUserDTO): Promise<IUserDTO> {
        const authService = new AuthServiceImpl();

        user.id = uuidv4();
        user.password = await authService.hashedPassword(user.password);

        const result = await new User(user);
        if (!result) return;

        await result.save();
        return result;
    }
}