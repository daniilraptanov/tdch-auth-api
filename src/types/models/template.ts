import { Day } from "../enums/day-enum";
import { Status } from "../enums/status-enum";


export interface IWeek {
    id: string;
    template: ITemplate;
    tasks: ITask[];
}

export interface ITemplate {
    id: string;
    name: string;
    description: string;
    creatorId: string;
    isPublic: boolean;
    tasks: ITask[];
}

export interface ITask {
    id: string;
    name: string;
    time: string;
    day: Day;
    status: Status;
}
