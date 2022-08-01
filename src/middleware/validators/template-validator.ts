import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { apiSchemasBadRequest } from "../../errors/http-errors";
import { templateSchema } from "../../schemas/template-schema";
import { TemplateServiceImpl } from "../../services/template-service";
import { UserServiceImpl } from "../../services/user-service";
import { ITemplate } from "../../types/models/template";
import { IUser } from "../../types/models/user";


export class TemplateValidator {
  static async checkTemplateData(req: Request, res: Response, next: NextFunction) {
    try {
      const fields = req.body;
      const { error } = templateSchema.validate(fields);

      if (error) {
        return apiSchemasBadRequest(error, res);
      }
      const templateService = new TemplateServiceImpl();

      const template: ITemplate = await templateService.getTemplateByName(fields.name);
      if (template) {
        return res.status(StatusCodes.BAD_REQUEST).send(`Template with name ${fields.name} already exist`);
      }

      return next();
    } catch (err) {
      console.log(err);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
    }
  }
}
