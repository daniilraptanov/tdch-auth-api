import { IUserDTO } from "../dto/user-dto";

export interface IUserService {
    getUserByEmail(email: string): Promise<IUserDTO>;
    createUser(user: IUserDTO): Promise<IUserDTO>;
}