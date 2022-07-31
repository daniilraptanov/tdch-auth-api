import User from "../db/models/user";
import { IUserDTO } from "../types/dto/user-dto";
import { IAuthService } from "../types/services/auth-service";
import { IUserService } from "../types/services/user-service";
import { AuthServiceImpl } from "./auth-service";

export class UserServiceImpl implements IUserService {
    private authService: IAuthService;

    constructor() {
        this.authService = new AuthServiceImpl();
    }

    async getUserByEmail(email: string): Promise<IUserDTO> {
        return await User.findOne().where({ email: email });
    }

    async createUser(user: IUserDTO): Promise<IUserDTO> {
        user.password = await this.authService.hashedPassword(user.password);
        const result = await new User(user);
        if (!result) return;

        await result.save();
        return result;
    }
}