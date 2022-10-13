import { Express } from "express";
import { Server } from "socket.io";
import { UserController } from "./user.controller";
import { UserRouter } from "./user.routes";

export class UserModule {
    public routes : UserRouter;

    constructor(app: Express, ws: Server){
        this.routes = new UserRouter(app, new UserController(ws));
    }
}