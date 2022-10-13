import { json, urlencoded } from 'body-parser';
import path from 'path';
import mongoose from 'mongoose';
import 'dotenv/config';

//Servidor
import express, { Express, NextFunction, Request, Response } from 'express';
import { Server as SocketServer } from 'socket.io';



//Modules
import { UserModule } from './modules/user/user.module';
import { UserTypeModule } from './modules/userType/userType.module';

//Numero de puerto
const port = 3000;
const portRealTime = 4000;

class Server {
    private app : Express = express();
    private server : any;
    private realTimeServer: SocketServer = new SocketServer();
    private windowsOpen : number;
    private contadorSocket : number;
    private usersContect : any;

    constructor(){
        //Configuracion de express
        this.configure();
        
        this.startDb();
        this.startRealTimeCommunication();
        this.initModules();
        this.windowsOpen = 0;
        this.contadorSocket = 0;
        this.usersContect = [];
    }

    private configure(){
        this.app.use((__req:  Request, res: Response, next: NextFunction) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Content-Disposition, Accept, Access-Control-Allow-Request-Method, x-auth-token');
            res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
            res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
            next();
        });
        this.app.use(json());
        this.app.use(urlencoded({ extended: true }));
        this.configurePublicPath();
    }

    //Funcion para configurar los archivos estaticos (frontend)
    private configurePublicPath(){
        this.app.use('/', express.static(path.resolve(__dirname, 'public')));
        this.app.use('/exported', express.static('exported'));
    }

    private startRealTimeCommunication(){

        //Setear el puerto
        this.realTimeServer = new SocketServer(portRealTime, {
            cors: {
                origin: "*",
                methods: ["GET", "POST"]
            }
        });

        this.realTimeServer.on('connection',(__socket)=> {
            
            
            console.log('Estoy en el servidor real time');


        });


    }

    public startServer(){
        //Funcion que valida los datos de no ser validos devuelve un error
        //Setear el puerto
        this.app.listen(port, ()=> {
            console.log(`server listening on port ${port}`);
        });
    }

    private startDb(){
        const url = process.env.URL_DB || '';
        void mongoose.connect(url);
    }

    private initModules(){
       new UserModule(this.app, this.realTimeServer);
       new UserTypeModule(this.app, this.realTimeServer);
    }

    public getApp(){
        return this.app;
    }
}

export default new Server();