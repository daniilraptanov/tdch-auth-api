import Template from "../db/models/template";
import { ITemplate } from "../types/models/template";
import { ITemplateService } from "../types/services/template-service";

export class TemplateServiceImpl implements ITemplateService {
    async getTemplateById(id: string): Promise<ITemplate> {
        return await Template.findOne().where({ id: id });
    }

    async getTemplateByName(name: string): Promise<ITemplate> {
        return await Template.findOne().where({ name: name });
    }

    async getTemplates(): Promise<ITemplate[]> {
        return await Template.find();
    }

    async createTemplate(template: ITemplate): Promise<ITemplate> {
        const result = await new Template(template);
        if (!result) return;

        await result.save();
        return result;
    }

    async removeTemplateById(id: string): Promise<boolean> {
        return (await Template.findOneAndRemove().where({ id: id })) && true;
    }
}