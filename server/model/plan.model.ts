import mongoose, { Document, Mongoose } from "mongoose";

export interface IPlan {
    planName:string
    projectLimit:number
    teamLimit:number
    price:number
}

interface IPlanDocument extends IPlan , Document {}

const planSchema = new mongoose.Schema<IPlanDocument>({
    planName:{type:String, required:true, trim:true},
    projectLimit:{type:Number, required:true},
    teamLimit:{type:Number, required:true},
    price:{type:Number, required:true}
})

const Plan = mongoose.model<IPlanDocument>("Plan", planSchema, "plans")

export default Plan;