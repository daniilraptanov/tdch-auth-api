import { IAuthDTO } from "../dto/auth-dto";
import { IUser } from "../models/user";

export interface IUserService {
    getUserById(id: string): Promise<IUser>;
    getUserByEmail(email: string): Promise<IUser>;
    createUser(user: IAuthDTO): Promise<IUser>;
}