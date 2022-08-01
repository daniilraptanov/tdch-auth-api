import { ITemplateDTO } from "../dto/template-dto";
import { ITemplate } from "../models/template";

export interface ITemplateService {
    getTemplateByName(name: string): Promise<ITemplate>;
    getTemplateById(id: string): Promise<ITemplate>;
    getPublicTemplates(): Promise<ITemplate[]>;
    createTemplate(template: ITemplateDTO): Promise<ITemplate>;
    removeTemplateById(id: string): Promise<boolean>;
}