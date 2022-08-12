import { Request } from "express";

export class BaseController {
    protected static setCurrentUserToRequest(req: Request, user: any): void {
        req["user"] = user;
    }

    protected static getCurrentUserId(req: Request): string {
        return req["user"]["userId"];
    }

    protected static setEntityToRequest(req: Request, entity: any): void {
        req["entity"] = entity;
    }

    protected static getEntity(req: Request): any {
        return req["entity"];
    }
}