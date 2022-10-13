import userTypeModel, { UserType } from "./userType.model";


export class UserTypeRepository{


    public async getAllUsersType(): Promise<UserType[]>{
        return await userTypeModel.find();
    }


    public async addUserType(userType: UserType): Promise<UserType>{
        return await userTypeModel.create(userType);
    }

    public async deleteUserType(_id: string){
        const res = await userTypeModel.findByIdAndDelete(_id);
        return res;
    }

    public async updateUserType(id: string, updates: object){
        const res = await userTypeModel.findByIdAndUpdate(id, updates, { new: true });
        return res;
    }


}