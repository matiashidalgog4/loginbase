import { User } from "./user.model";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import 'dotenv/config';

//Repositorios externos para corroboraciones
import { UserRepository } from "./user.repository";


//Cantidad de Usuarios por licencia



export class UserBussiness {
    private userRepository : UserRepository;

    constructor(){
        this.userRepository = new UserRepository();

    }

    public async getAllUsers(){
        const users : User[]= await this.userRepository.getAllUsers(); 
        return  users;
    }

    public async getUserByUserName(userName: string){
        const user : User= await this.userRepository.getUserByUserName(userName); 
        return  user;
    }

    public async addUser(user: User){

        /* const maxUsersEnabled = 4; */

        /* if(user.enabled === true && await this.userRepository.getUserEnabledCount() >= maxUsersEnabled) throw new Error('Supero la cantidad de usuarios permitidos por Licencia.'); */


        //Hashear el password
        const salt = await bcrypt.genSalt(10);
        user.password= await bcrypt.hash(user.password, salt);

        const userAdded : User= await this.userRepository.addUser({...user, fecAlt: new Date()});
        userAdded.password = '';
        return userAdded;
    }

    public async authUser(userName: string, password: string){

        const user = await this.userRepository.getUserByUserName(userName);
        
        if(!user) throw new Error('Usuario Incorrecto.');
        

        const passCorrecto = await bcrypt.compare(password, user.password);
        if(!passCorrecto) {
            throw new Error('Clave Incorrecta.');
        }

        if(user.enabled === false)
            throw new Error('Usuario deshabilitado.');

        //Creo el contenido que va a tener el token
        const payload = {
            usuario: {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                id: user._id,
                userName: user.userName
            }
        };

        const secreta = process.env.SECRET || '';

        //firmar el token JWT
        const token = jwt.sign(payload, secreta , {
            expiresIn: 360000
        });

        return token;
    }

    public async authUserToken(userName: string){

        const user= await this.userRepository.getUserByUserName(userName);
        if(user.enabled === false) throw new Error('Usuario deshabilitado en el Sistema.');
        if(!user) throw new Error('No existe un Usuario.');
        /* await this.updateUser(user._id, {lastEntry: new Date()}); */
        return user;
    }

    public async deleteUser(_id: string){

        const deletedUser = this.userRepository.deleteUser(_id);

        return deletedUser;
    }

    public async updateUser(_id: string, updates: User){

        /* let maxUsersEnabled = await this.licenseBussiness.cantUsuariosHabilitados(); */

        if(updates.enabled !== null && updates.enabled !== undefined  && updates.enabled === true){
            const user = await this.userRepository.getUserByID(_id) as unknown as User;
           /*  if(user.enabled === false && await this.userRepository.getUserEnabledCount() >= maxUsersEnabled) throw new Error('Supero la cantidad de usuarios permitidos por Licencia.'); */
        }
        

        if(updates.password){
            const salt = await bcrypt.genSalt(10);
            updates.password= await bcrypt.hash(updates.password, salt);
        }

        const updatedUser = this.userRepository.updateUser(_id, updates);

        return updatedUser;
    }
}