import z from 'zod'
import mongoose from 'mongoose'

const isValidObjectId = (value:string)=>{
    return mongoose.Types.ObjectId.isValid(value)
}

const projectValSchema = z.object({
    title:z.string({
        required_error:"Title is required",
        invalid_type_error:"Title must be a string"
    })
    .min(1,"Title can't be empty")
    .max(255, "Title is too large"),

    description:z.string({
        required_error:"Description is required",
        invalid_type_error:"Description must be a string"
    })
    .min(1, "Description can't be empty")
    .max(255, "Description is too large"),

    createdBy:z.custom<mongoose.Types.ObjectId>(
           (val)=> isValidObjectId(val) && new mongoose.Types.ObjectId(val), 
           {
               message:"User id must be a valid Mondob Object Id"
           }
       ),

    orgId:z.custom<mongoose.Types.ObjectId>(
        (val)=> isValidObjectId(val) && new mongoose.Types.ObjectId(val),
        {
            message:"Orgnization is must be a valid id"
        }
    )

})

export type IProjectSchema = z.infer<typeof projectValSchema>

export {
    projectValSchema
}