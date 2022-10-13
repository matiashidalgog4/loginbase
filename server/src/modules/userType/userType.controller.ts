import { Request, Response } from "express";
import { Server } from "socket.io";
import { UserTypeBussiness } from "./userType.bussiness";
import { UserType } from "./userType.model";
import { TypeRequestBody } from "../../utils/utils";


export class UserTypeController {
    private userTypeBussiness : UserTypeBussiness;
    private socketServer: Server;

    constructor(socketServer: Server, userTypeBussiness: UserTypeBussiness = new UserTypeBussiness()){
        this.userTypeBussiness = userTypeBussiness;
        this.socketServer = socketServer;
    }

    public getAllUsersType = async (__req: Request, res: Response) =>{
        const usersType = await this.userTypeBussiness.getAllUsersType();
        return res.json({ usersType });
    };

    public addUserType = async (req: TypeRequestBody<{userType : UserType}>, res: Response)=>{
        try{
            
            const userType = req.body.userType;
            const userTypeCreated: UserType = await this.userTypeBussiness.addUserType(userType);

            this.socketServer.emit('newUserType', userTypeCreated);

            return res.json({ userType: userTypeCreated });
        }
        catch(err){

            if(err instanceof Error){
                return res.status(402).json({ err: true, errMsg: err.message });
            }
        }
    };

   /*  public deleteUserType = async (req: Request, res: Response)=>{
        try{
            let _id = req.body.id;
            let userTypeDeleted = await this.userTypeBussiness.deleteUserType(_id);

            this.socketServer.emit('deleteUserType', userTypeDeleted);

            return res.json( userTypeDeleted );
        }
        catch(err: any){
            return res.json({ err: true, errMsg: err.message });
        }
    };

    public updateUserType = async (req: Request, res: Response)=>{
        try{
            const { id, updates } = req.body;
            let updatedUserType = await this.userTypeBussiness.updateUserType(id, updates);

            this.socketServer.emit('updateUserType', updatedUserType);

            return res.json(updatedUserType);
        }
        catch(err: any){
            return res.json({ err: true, errMsg: err.message });
        }
    }; */

}

