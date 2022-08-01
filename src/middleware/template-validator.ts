import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { apiSchemasBadRequest } from "../errors/http-errors";
import { templateSchema } from "../schemas/template-schema";
import { TemplateServiceImpl } from "../services/template-service";
import { UserServiceImpl } from "../services/user-service";
import { ITemplate } from "../types/models/template";
import { IUser } from "../types/models/user";


export class TemplateValidator {
  static async checkTemplateData(req: Request, res: Response, next: NextFunction) {
    try {
      const fields = req.body;
      const { error } = templateSchema.validate(fields);

      if (error) {
        return apiSchemasBadRequest(error, res);
      }
      const templateService = new TemplateServiceImpl();
      const userService = new UserServiceImpl();

      const template: ITemplate = await templateService.getTemplateByName(fields.name);
      if (template) {
        return res.status(400).send(`Template with name ${fields.name} already exist`);
      }

      const user: IUser = await userService.getUserById(fields.creatorId);
      if(!user) {
        return res.status(400).send(`User with id ${fields.creatorId} does not exist`);
      }


      return next();
    } catch (err) {
      console.log(err);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
    }
  }
}
