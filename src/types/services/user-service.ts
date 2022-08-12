import { IAuthDTO } from "../dto/auth-dto";
import { ITemplate, IWeek } from "../models/template";
import { IUser } from "../models/user";

export interface IUserService {
    getUserById(id: string): Promise<IUser>;
    getUserByEmail(email: string): Promise<IUser>;
    createUser(user: IAuthDTO): Promise<IUser>;

    getUserWeekByTemplateId(userId: string, templateId: string): Promise<IWeek>;
    updateUserWeeks(userId: string, template: ITemplate): Promise<IUser>;
}