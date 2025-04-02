import mongoose, { Schema, Document, Error } from "mongoose";
import bcrypt from 'bcrypt'

export interface IAuth{
    email : string;
    password:string;
    accessToken?:string | null;
    refreshToken?:string | null;
    lastLogin?:Date | null;
    isActive:boolean,
    userId:Schema.Types.ObjectId;
}

export interface IAuthDocument extends IAuth, Document{}

const authSchema = new Schema <IAuthDocument> ({
    email:{type:String, required:true},
    password:{type:String, required:true},
    accessToken:{type:String , default:null},
    refreshToken:{type:String , default:null},
    lastLogin:{type:Date},
    isActive:{type:Boolean, default:true},
    userId:{type:Schema.Types.ObjectId , ref:"user"},
},
{timestamps:true}
)

authSchema.pre("save", async function(next){
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt)
        next()
    } catch (error) {
        next(error as Error)
    }
})

const Auth = mongoose.model<IAuthDocument>("Auth", authSchema, "auth");

export default Auth;