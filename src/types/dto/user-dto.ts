import { IWeek } from "../models/template";

export interface IUserDTO {
    id: string;
    email: string;
    weeks: IWeek[];
}