import { Request } from "express";

export class BaseController {
    protected static getCurrentUser(req: Request) {
        return req["user"]["userId"];
    }
}