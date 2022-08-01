import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";


export class TemplateController {
  static async getTemplate(req: Request, res: Response) {
    try {
      
    } catch (err) {
      console.log(err);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
    }
  }

  static async getTemplates(req: Request, res: Response) {
    try {
      
    } catch (err) {
      console.log(err);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
    }
  }

  static async createTemplate(req: Request, res: Response) {
    try {
      
    } catch (err) {
      console.log(err);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
    }
  }

  static async removeTemplate(req: Request, res: Response) {
    try {
      
    } catch (err) {
      console.log(err);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
    }
  }
}
