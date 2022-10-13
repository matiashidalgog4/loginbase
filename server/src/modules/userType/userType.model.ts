import mongoose from "mongoose";


export const  UserTypeSchema = new mongoose.Schema({

    typeName:{
        type: String,
        required: true
    },

    descr:{
        type: String,
        required: true
    },

});

export interface UserType{
    typeName: string;
    descr: string;
}

export default mongoose.model('UserType', UserTypeSchema);