import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { BaseController } from "../controllers/base-controller";
import { TemplateServiceImpl } from "../services/template-service";
import { ITemplate } from "../types/models/template";


export class RoleMiddleware extends BaseController {
  static async checkTemplateRole(req: Request, res: Response, next: NextFunction) {
    try {
      const templateService = new TemplateServiceImpl();

      const { id } = req.params;
      const userId = this.getCurrentUserId(req);

      const template: ITemplate = await templateService.getTemplateById(id);
      if (!template) {
        return res.status(StatusCodes.NOT_FOUND).send("Template does not found");
      }

      if (template.creatorId !== userId) { // TODO :: replace this logic
        return res.status(StatusCodes.FORBIDDEN).send("Access is denied");
      }

      this.setEntityToRequest(req, template);
      return next();
    } catch (err) {
      console.log(err);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
    }
  }

  static async checkPublicTemplate(req: Request, res: Response, next: NextFunction) {
    try {
      const templateService = new TemplateServiceImpl();

      const { id } = req.params;
    
      const template: ITemplate = await templateService.getTemplateById(id);
      if (!template) {
        return res.status(StatusCodes.NOT_FOUND).send("Template does not found");
      }

      if (!template.isPublic) {
        return res.status(StatusCodes.FORBIDDEN).send("Access is denied");
      }

      this.setEntityToRequest(req, template);
      return next();
    } catch (err) {
      console.log(err);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
    }
  }
}
