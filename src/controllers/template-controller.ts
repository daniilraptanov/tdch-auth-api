import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { TemplateServiceImpl } from "../services/template-service";
import { ITemplate } from "../types/models/template";


export class TemplateController {
  static async getTemplate(req: Request, res: Response) {
    try {
      const templateService = new TemplateServiceImpl();
    
      const { id } = req.params;
      const template: ITemplate = await templateService.getTemplateById(id);
      if (!template) {
        res.status(StatusCodes.NOT_FOUND).send("Template not found");
      }

      res.status(StatusCodes.OK).json(); // TODO :: send Template and use mapper here
    } catch (err) {
      console.log(err);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
    }
  }

  static async getTemplates(req: Request, res: Response) {
    try {
        const templateService = new TemplateServiceImpl();

        const templates: ITemplate[] = await templateService.getTemplates();
        if (!templates) {
            res.status(StatusCodes.NOT_FOUND).send("Templates not found");
        }

        res.status(StatusCodes.OK).json(); // TODO :: send array of Templates and use mapper here
    } catch (err) {
      console.log(err);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
    }
  }

  static async createTemplate(req: Request, res: Response) {
    try {
        const templateService = new TemplateServiceImpl();

        const data = req.body; // TODO :: use mapper here

      
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
}
