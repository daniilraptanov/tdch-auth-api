import Template from "../db/models/template";
import { ITemplateDTO } from "../types/dto/template-dto";
import { ITemplate } from "../types/models/template";
import { ITemplateService } from "../types/services/template-service";

export class TemplateServiceImpl implements ITemplateService {
    async getTemplateById(id: string): Promise<ITemplate> {
        return await Template.findOne().where({ id: id });
    }

    async getTemplateByName(name: string): Promise<ITemplate> {
        return await Template.findOne().where({ name: name });
    }

    async getPublicTemplates(): Promise<ITemplate[]> {
        return await Template.find().where({ isPublic: true });
    }

    async createTemplate(template: ITemplateDTO): Promise<ITemplate> {
        const result = await new Template(template);
        if (!result) return;

        await result.save();
        return result;
    }

    async removeTemplateById(id: string): Promise<boolean> {
        return (await Template.findOneAndRemove().where({ id: id })) && true;
    }
}