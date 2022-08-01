import { ITaskDTO, ITemplateDTO } from "../dto/template-dto";


export interface IWeek {
    id: string;
    template: ITemplate;
    tasks: ITask[];
}

export interface ITemplate extends ITemplateDTO {
    id: string;
    tasks: ITask[];
}

export interface ITask extends ITaskDTO {
    id: string;
}
