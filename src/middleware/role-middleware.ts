import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { TemplateServiceImpl } from "../services/template-service";
import { ITemplate } from "../types/models/template";


export class RoleMiddleware {
  static async checkTemplateRole(req: Request, res: Response, next: NextFunction) {
    try {
      const templateService = new TemplateServiceImpl();

      const { id } = req.params;
      const userId = req["user"]["userId"]; // TODO :: replace this logic

      const template: ITemplate = await templateService.getTemplateById(id);
      if (!template) {
        return res.status(StatusCodes.NOT_FOUND);
      }

      if (template.creatorId !== userId) { // TODO :: replace this logic
        return res.status(StatusCodes.UNAUTHORIZED);
      }

      return next();
    } catch (err) {
      console.log(err);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
    }
  }
}
