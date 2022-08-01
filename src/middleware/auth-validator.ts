import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { apiSchemasBadRequest } from "../errors/http-errors";
import { loginSchema, registerSchema } from "../schemas/auth-schema";
import { AuthServiceImpl } from "../services/auth-service";
import { UserServiceImpl } from "../services/user-service";
import { IUser } from "../types/models/user";

const jwt = require("jsonwebtoken");
require("dotenv-safe").config();


export class AuthValidator {
  static async checkLoginData(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const { error } = loginSchema.validate({ email, password });

      if (error) {
        return apiSchemasBadRequest(error, res);
      }
      const authService = new AuthServiceImpl();
      const userService = new UserServiceImpl();

      const user: IUser = await userService.getUserByEmail(email);
      if (!user) {
        return res.status(StatusCodes.BAD_REQUEST).send("User does not exist");
      }

      if (!(await authService.checkPasswordHash(email, password))) {
        return res.status(StatusCodes.BAD_REQUEST).send("Password does not correct");
      }

      return next();
    } catch (err) {
      console.log(err);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
    }
  }

  static async checkRegisterData(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { email, password, confirmPassword } = req.body;
      const { error } = registerSchema.validate({
        email,
        password,
        confirmPassword
      });

      if (error) {
        return apiSchemasBadRequest(error, res);
      }

      const userService = new UserServiceImpl();

      const user: IUser = await userService.getUserByEmail(email);
      if (user) {
        return res.status(StatusCodes.BAD_REQUEST).send(`User with email ${email} already exist`);
      }

      return next();
    } catch (err) {
      console.log(err);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
    }
  }

  static async auth(req: Request, res: Response, next: NextFunction) {
    if (req.method === "OPTIONS") {
      return next();
    }

    try {
      const token = req.headers.authorization.split(" ")[1];
      if (!token) {
        return res.status(StatusCodes.UNAUTHORIZED).send("Authorization Error");
      }

      req["user"] = jwt.verify(token, process.env.JWT_SECRET_KEY);
      next();
    } catch {
      return res.status(StatusCodes.UNAUTHORIZED).send("Authorization Error");
    }
  }
}
