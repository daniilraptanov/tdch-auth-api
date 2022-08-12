import User from "../db/models/user";
import { IAuthDTO } from "../types/dto/auth-dto";
import { ITemplate, IWeek } from "../types/models/template";
import { IUser } from "../types/models/user";
import { IUserService } from "../types/services/user-service";
import { AuthServiceImpl } from "./auth-service";

export class UserServiceImpl implements IUserService {
  async getUserById(id: string): Promise<IUser> {
    return await User.findOne().where({ id: id });
  }

  async getUserByEmail(email: string): Promise<IUser> {
    return await User.findOne().where({ email: email });
  }

  async createUser(user: IAuthDTO): Promise<IUser> {
    const authService = new AuthServiceImpl();

    user.password = await authService.hashedPassword(user.password);

    const result = await new User(user);
    if (!result) return;

    await result.save();
    return result;
  }

  async getUserWeekByTemplateId(
    userId: string,
    templateId: string
  ): Promise<IWeek> {
    return (
      await User.findOne({ id: userId })
    ).weeks.find((week) => week.templateId === templateId);
  }

  async updateUserWeeks(userId: string, template: ITemplate): Promise<any> {
    return await User.updateOne(
      { id: userId },
      {
        $push: {
          weeks: {
            id: null,
            templateId: template.id,
            tasks: template.tasks,
          },
        },
      }
    );
  }
}
