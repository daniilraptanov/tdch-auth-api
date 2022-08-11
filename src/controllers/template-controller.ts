import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { templateMapperFactory } from "../mappers/template-mapper";
import { TemplateServiceImpl } from "../services/template-service";
import { ITemplateDTO } from "../types/dto/template-dto";
import { ITemplate } from "../types/models/template";
import { BaseController } from "./base-controller";


export class TemplateController extends BaseController {
  static async getTemplate(req: Request, res: Response) {
    try {
      const templateService = new TemplateServiceImpl();
    
      const { id } = req.params;
      const template: ITemplate = await templateService.getTemplateById(id);
      if (!template) {
        res.status(StatusCodes.NOT_FOUND).send("Template not found");
      }

      res.status(StatusCodes.OK).json(templateMapperFactory(template));
    } catch (err) {
      console.log(err);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
    }
  }

  static async getPublicTemplates(_req: Request, res: Response) {
    try {
        const templateService = new TemplateServiceImpl();

        const templates: ITemplate[] = await templateService.getPublicTemplates();
        if (!templates) {
            res.status(StatusCodes.NOT_FOUND).send("Templates not found");
        }

        res.status(StatusCodes.OK).json(templates.map(template => templateMapperFactory(template)));
    } catch (err) {
      console.log(err);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
    }
  }

  static async createTemplate(req: Request, res: Response) {
    try {
        const templateService = new TemplateServiceImpl();

        const data: ITemplateDTO = req.body;
        const userId = this.getCurrentUser(req);

        const template: ITemplate = await templateService.createTemplate({
            ...data,
            creatorId: userId 
        });
        if (!template) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Template does not created");
        }

        res.status(StatusCodes.CREATED).json(templateMapperFactory(template));
    } catch (err) {
      console.log(err);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
    }
  }

  static async removeTemplate(req: Request, res: Response) {
    try {
        const templateService = new TemplateServiceImpl();

        const { id } = req.params;
        const isTemplateRemoved: boolean = await templateService.removeTemplateById(id);
        if (!isTemplateRemoved) {
          res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Template does not removed");
        }

        res.status(StatusCodes.OK).send("Template is removed");
    } catch (err) {
      console.log(err);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
    }
  }

  static async addTemplateToCurrentUser(req: Request, res: Response) {
    try {
      const templateService = new TemplateServiceImpl();

      const { id } = req.params;
      const userId = this.getCurrentUser(req);
      // TODO :: add Template by { id } to current User

    } catch (err) {
      console.log(err);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
    }
  }

  static async removeTemplateFromCurrentUser(req: Request, res: Response) {
    try {
      const templateService = new TemplateServiceImpl();

      const { id } = req.params;
      const userId = this.getCurrentUser(req);
      // TODO :: remove Template by { id } from current User

    } catch (err) {
      console.log(err);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
    }
  }
}
