import { IWeekDTO } from "./template-dto";

export interface IUserDTO {
    id: string;
    email: string;
    weeks: IWeekDTO[];
}