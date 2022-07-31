import { Day } from "../enums/day-enum";
import { Status } from "../enums/status-enum";


export interface IWeekDTO {
    template: ITemplateDTO;
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
    name: string;
    time: string;
    day: Day;
    status: Status;
}
