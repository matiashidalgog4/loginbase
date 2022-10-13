import { Express } from "express";
import { Server } from "socket.io";
import { UserTypeController } from "./userType.controller";
import { UserTypeRouter } from "./userType.routes";

export class UserTypeModule {
    public routes : UserTypeRouter;

    constructor(app: Express, ws: Server){
        this.routes = new UserTypeRouter(app, new UserTypeController(ws));
    }
}