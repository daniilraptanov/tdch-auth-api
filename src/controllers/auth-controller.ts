import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { AuthServiceImpl } from "../services/auth-service";
import { UserServiceImpl } from "../services/user-service";
import { IAuthDTO } from "../types/dto/auth-dto";
import { IUserDTO } from "../types/dto/user-dto";


export class AuthController {
  static async login(req: Request, res: Response) {
    try {
      const authService = new AuthServiceImpl();
      const userService = new UserServiceImpl();

      const data: IAuthDTO = req.body;
      const user: IUserDTO = await userService.getUserByEmail(data.email);

      const token = authService.createToken(user.id);

      if (!token) {
        return res.status(500).send("Token does not created");
      }

      res.status(200).json({ token: token });
    } catch (err) {
      console.log(err);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
    }
  }

  static async register(req: Request, res: Response) {
    try {
      const userService = new UserServiceImpl();

      const data: IUserDTO = req.body;
      const user: IUserDTO = await userService.createUser(data);

      if (!user) {
        res.status(500).send("User does not created!");
      }
      
      res.status(201).send("User was created");
    } catch (err) {
      console.log(err);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
    }
  }
}
