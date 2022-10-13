
import { UserType } from "./userType.model";
import { UserTypeRepository } from "./userType.repository";

export class UserTypeBussiness {
    private userTypeRepository : UserTypeRepository;
    
    constructor(){
        this.userTypeRepository = new UserTypeRepository();
    }

    public async getAllUsersType(){
        const usersType : UserType[]= await this.userTypeRepository.getAllUsersType(); 
        return  usersType;
    }

    public async addUserType(userType: UserType){
        const userTypeAdded = await this.userTypeRepository.addUserType(userType);
        return userTypeAdded;
    }

/*     public async deleteUserType(_id: String){
        let deletedUserType = this.userTypeRepository.deleteUserType(_id);
        return deletedUserType;
    };

    public async updateUserType(_id: String, updates: any){
        let updatedUserType = this.userTypeRepository.updateUserType(_id, updates);
        return updatedUserType;
    };
 */
}