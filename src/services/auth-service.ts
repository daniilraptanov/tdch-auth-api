import bcrypt from "bcryptjs";
import User from "../db/models/user";
import { IAuthService } from "../types/services/auth-service";
import { IUserService } from "../types/services/user-service";
import { UserServiceImpl } from "./user-service";

const jwt = require("jsonwebtoken");
require("dotenv-safe").config();


export class AuthServiceImpl implements IAuthService {
  async checkPasswordHash(email: string, password: string): Promise<boolean> {
    const userService = new UserServiceImpl();

    const hash: string = (await userService.getUserByEmail(email)).password;
    return await bcrypt.compare(password, hash);
  }

  async hashedPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 12);
  }

  createToken(userId: string): string {
    return jwt.sign(
      { userId: userId },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "5h" }
    );
  }
}
