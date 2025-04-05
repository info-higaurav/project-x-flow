import z from 'zod'
import mongoose from 'mongoose'
const isValidId = (val:string)=>{
    return mongoose.Types.ObjectId.isValid(val);
} 

const teamScheam = z.object({
    name:z.string({
        required_error:"Team name is required",
        invalid_type_error:"Team name must be a string"
    })
    .min(1, "Team name can't be empty")
    .max(255, "Team name is too long"),
    
    description:z.string({
        required_error:"Description is required",
        invalid_type_error:"Description must be string"
    })
    .min(1,"Description is required")
    .max(255, "Description is too long"),

    createdBy:z.custom<mongoose.Types.ObjectId>(
        (val)=> isValidId(val) && new mongoose.Types.ObjectId(val),
        {message:"User id is not valid"}
    ),

    orgId:z.custom<mongoose.Types.ObjectId>(
        (val)=> isValidId(val) && new mongoose.Types.ObjectId(val),
        {message:"Organization id is not valid"}
    ),

    members:z.array(z.custom<mongoose.Types.ObjectId>(
        (val)=> isValidId(val) && new mongoose.Types.ObjectId(val),
        {message:"Member id is not valid"}
    ),{
        invalid_type_error:"Member must be an array of valid ObjectId",
        required_error:"Members is required"
    }).nonempty({message:"At least one member is required"})
    
})

export type ITeam = z.infer <typeof teamScheam>

export {
    teamScheam
}