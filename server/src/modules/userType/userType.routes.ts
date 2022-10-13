import { Express } from 'express';
import { UserTypeController } from './userType.controller';


export class UserTypeRouter {
    private routeController: UserTypeController;

    constructor(app: Express,routeController: UserTypeController){
        this.routeController = routeController;
        this.configureRoutes(app);
    }

    private configureRoutes(app: Express){

        //
        app.route('/userType')
        .get(this.routeController.getAllUsersType);

        //
        app.route('/userType')
        .post(this.routeController.addUserType);

/*         //
        app.route('/userType')
        .delete(this.routeController.deleteUserType);
        
        //
        app.route('/userType')
        .put(this.routeController.updateUserType); */


    }
}