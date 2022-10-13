import mongoose from "mongoose";


export const  UserSchema = new mongoose.Schema({

    fullName:{
        type: String,
        required: true
    },

    userName:{
        type: String,
        required: true
    },

    password:{
        type: String,
        required: true
    },

    email:{
        type: String,
        required: false,
        unique: true
    },

    enabled:{
        type: Boolean,
        required: false,
        default: false
    },

    fecAlt:{
        type: Date
    },

    userAID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: false
    },

    userNameA:{

        type: String,
        ref: 'User',
        require: true
    },

    lastEntry: {
        type: Date,
        require: false
    },

    userType: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserType'
    }]

});

export interface User{
    fullName: string;
    userName: string;
    password: string;
    email: string;
    enabled: boolean;
    fecAlt: Date;
    userAID: string;
    userNameA: string;
    lastEntry: Date;
    userType: Array<unknown>;
    _id: string;
}

export default mongoose.model('User', UserSchema);