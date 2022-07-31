import { IAuthDTO } from "./auth-dto";
import { IWeekDTO } from "./template-dto";

export interface IUserDTO extends IAuthDTO {
    id?: string;
    weeks: IWeekDTO[];
}

