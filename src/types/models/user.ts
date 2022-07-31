import { IAuthDTO } from "../dto/auth-dto";
import { IWeek } from "./template";

export interface IUser extends IAuthDTO {
    id: string;
    weeks: IWeek[];
}

