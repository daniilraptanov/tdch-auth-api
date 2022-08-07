import { Day } from "../enums/day-enum";
import { Status } from "../enums/status-enum";


export interface IWeekDTO {
    id?: string;
    templateId: ITemplateDTO;
    tasks: ITaskDTO[];
}

export interface ITemplateDTO {
    id?: string;
    name: string;
    description: string;
    creatorId: string;
    isPublic: boolean;
    tasks: ITaskDTO[];
}

export interface ITaskDTO {
    id?: string;
    name: string;
    time: string;
    day: Day;
    status: Status;
}