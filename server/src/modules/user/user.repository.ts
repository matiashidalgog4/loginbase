import userModel, { User } from "./user.model";


export class UserRepository{

    public async getAllUsers(): Promise<User[]>{
        return await userModel.find({},{password: 0});
    }

    public async getUserByUserName(userName: string): Promise<User>{
        
        const resp = await userModel.findOne({ userName }).populate(["userType"]).exec();
        
        if(resp === null || resp === undefined) throw new Error('El usuario no existe.');

        //Declaro una interfaz de usuario
        const uss = resp as unknown as User;

        return uss;
    }

    public async getUserByID(id : string) : Promise<User>{

        const user = await userModel.findOne({ _id : id }, {password: 0}) as unknown as User;

        if(user === null || user === undefined) throw new Error('El usuario no existe.');
            
        return user;
    }

    public async addUser(user: User): Promise<User>{


/*         if(await this.getUserByName(user.userName))
            throw new Error('El usuario ingresado ya existe.');
        

        if(await this.getUserByEmail(user.email))
            throw new Error('El email ingresado ya existe.'); */


        ///Verificar que el UserType exista en la base de datos

        user.userName.toLocaleLowerCase();
        
        const us =  await userModel.create(user);
        
        const resp = await userModel.findOne({ userName:  us.userName}).populate(["userType"]).exec();
        
        if(resp === null || resp === undefined) throw new Error('No se creo el usuario.');

        //Declaro una interfaz de usuario
        const uss = resp as unknown as User;

        return uss;
    }

    public async deleteUser(_id: string): Promise<User>{

        const res = await userModel.findByIdAndDelete(_id) as unknown as User;
        
        return res;
    }

    public async updateUser(id: string, updates: object): Promise<User>{

        const resp = await userModel.findByIdAndUpdate(id, updates, { new: true });

        if(resp === null || resp === undefined) throw new Error('No se actualizo el usuario.');

        //Declaro una interfaz de usuario
        const uss = resp as unknown as User;

        return await this.getUserByUserName(resp.userName);
    }
}