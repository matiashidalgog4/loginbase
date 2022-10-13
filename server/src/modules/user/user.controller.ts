import { Request, Response } from "express";
import { Server } from "socket.io";
import { UserBussiness } from "./user.bussiness";
import { TypeRequestBody } from "../../utils/utils";
import { User } from "./user.model";

export class UserController {
    private userBussiness : UserBussiness;
    private socketServer: any;

    constructor(socketServer: Server, userBussiness: UserBussiness = new UserBussiness()){
        this.userBussiness = userBussiness;
        this.socketServer = socketServer;
    }

    public getAllUsers = async (req: Request, res: Response) =>{
        const users = await this.userBussiness.getAllUsers();
        return res.json({ users });
    };

    public getUserByUserName = async (req: Request, res: Response) =>{
        try{
            const {userName} = req.params;
            const user = await this.userBussiness.getUserByUserName(userName);
            return res.json({ user });
            
        }catch(err){
            if(err instanceof Error) return res.status(402).json({ err: true, errMsg: err.message });
        }
    };

    public addUser = async (req: TypeRequestBody<{user: User}>, res: Response) =>{
        try{
            const user = req.body.user;
            const userCreated = await this.userBussiness.addUser(user);


            return res.json({ user: userCreated });
        }
        catch(err){
            if(err instanceof Error) return res.status(402).json({ err: true, errMsg: err.message });
        }
    };

    public updateUser = async (req: TypeRequestBody<{id: string, updates: User}>, res: Response)=>{
        try{
            const { id, updates } = req.body;

            const updatedUser = await this.userBussiness.updateUser(id, updates);

            updatedUser.password = '';
            /* this.socketServer.emit('updateUser', updatedUser); */
            return res.json(updatedUser);
        }
        catch(err){
            if(err instanceof Error) return res.status(402).json({ err: true, errMsg: err.message });
        }
    };

    public deleteUser = async (req: TypeRequestBody<{id: string}>, res: Response)=>{
        try{
            const { id: _id } = req.body;
          
            const userDeleted = await this.userBussiness.deleteUser(_id);

            /* this.socketServer.emit('deleteUser', userDeleted); */

            return res.json( userDeleted );
        }
        catch(err){
            if(err instanceof Error) return res.status(402).json({ err: true, errMsg: err.message });
        }
    };

    public authUser = async (req: TypeRequestBody<{userName: string, password: string}>, res: Response)=>{
        console.log('Me conecte con el frontend');
        try{
            const { userName, password } = req.body;

            const token = await this.userBussiness.authUser(userName, password);

            return res.status(200).json({ token });
        }
        catch(err){
            if(err instanceof Error) return res.status(402).json({ err: true, errMsg: err.message });
        }
    };

}