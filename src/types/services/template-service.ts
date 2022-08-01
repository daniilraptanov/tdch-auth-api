import { ITemplate } from "../models/template";

export interface ITemplateService {
    getTemplateByName(name: string): Promise<ITemplate>;
    getTemplateById(id: string): Promise<ITemplate>;
    getTemplates(): Promise<ITemplate[]>;
    createTemplate(template: ITemplate): Promise<ITemplate>;
    removeTemplateById(id: string): Promise<boolean>;
}