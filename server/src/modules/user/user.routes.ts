import { Express } from 'express';
import { UserController } from './user.controller';


export class UserRouter {
    private routeController: UserController;

    constructor(app: Express,routeController: UserController){
        this.routeController = routeController;
        this.configureRoutes(app);
    }

    private configureRoutes(app: Express){

        //Funciona
        app.route('/user')
        .get(this.routeController.getAllUsers);

        //Funciona
        app.route('/user/userName/:userName')
        .get(this.routeController.getUserByUserName);

        //Funciona
        app.route('/user')
        .post(this.routeController.addUser);       

        //Funciona
        app.route('/user')
        .put(this.routeController.updateUser);

        //Funciona
        app.route('/user')
        .delete(this.routeController.deleteUser);

        //Recibe el pass y userName y devuelve un Token si los datos son validos
        app.route('/user/auth')
        .post(this.routeController.authUser);

    }
}