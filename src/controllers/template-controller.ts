import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { templateMapperFactory } from "../mappers/template-mapper";
import { userMapperFactory } from "../mappers/user-mapper";
import { TemplateServiceImpl } from "../services/template-service";
import { UserServiceImpl } from "../services/user-service";
import { ITemplateDTO } from "../types/dto/template-dto";
import { ITemplate, IWeek } from "../types/models/template";
import { IUser } from "../types/models/user";
import { BaseController } from "./base-controller";


export class TemplateController extends BaseController {
  static async getTemplate(req: Request, res: Response) {
    try {    
      const template: ITemplate = this.getEntity(req);
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
        const userId = this.getCurrentUserId(req);

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
      const userService = new UserServiceImpl();

      const template: ITemplate = this.getEntity(req);
      const userId = this.getCurrentUserId(req);

      const week: IWeek = await userService.getUserWeekByTemplateId(userId, template.id);
      if (week) {
        res.status(StatusCodes.BAD_REQUEST).send("Template was usage");
      }
     
      const user: IUser = await userService.pushToUserWeeks(userId, template);
      if (!user || !user.weeks.find(week => week.templateId === template.id)) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
      }

      res.status(StatusCodes.OK).json(userMapperFactory(user));
    } catch (err) {
      console.log(err);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
    }
  }

  static async removeTemplateFromCurrentUser(req: Request, res: Response) {
    try {
      const userService = new UserServiceImpl();

      const template: ITemplate = this.getEntity(req);
      const userId = this.getCurrentUserId(req);

      const week: IWeek = await userService.getUserWeekByTemplateId(userId, template.id);
      if (!week) {
        res.status(StatusCodes.BAD_REQUEST).send("Template already was removed from User Weeks");
      }

      const user: IUser = await userService.popFromUserWeeks(userId, template.id);
      if (!user || user.weeks.find(week => week.templateId === template.id)) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
      }

      res.status(StatusCodes.OK).json(userMapperFactory(user));
    } catch (err) {
      console.log(err);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
    }
  }
}
