import { TypeMapper } from "ts-mapper";
import { ITemplateDTO } from "../types/dto/template-dto";
import { ITemplate } from "../types/models/template";


class TemplateMapper extends TypeMapper {
   constructor() {
      super();
      this.config();
   }
 
   private config(): void {
      this.createMap<ITemplate, ITemplateDTO>()
        .map(obj => obj.id, obj => obj.id)
        .map(obj => obj.name, obj => obj.name)
        .map(obj => obj.description, obj => obj.description)
        .map(obj => obj.creatorId, obj => obj.creatorId)
        .map(obj => obj.isPublic, obj => obj.isPublic)
        .map(obj => obj.tasks, obj => obj.tasks);
   }
}

export function templateMapperFactory(src: ITemplate): ITemplateDTO {
    const userMapper = new TemplateMapper();

    const result: ITemplateDTO = { id: null, name: null, description: null, creatorId: null, isPublic: null, tasks: [] };
    userMapper.map<ITemplate, ITemplateDTO>(src, result);

    return result;
}
