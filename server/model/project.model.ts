import mongoose,{Document, Schema} from "mongoose";

interface IProject {
    title:string
    description:string
    createdBy:Schema.Types.ObjectId 
    orgId:Schema.Types.ObjectId
}

interface IProjectDocument extends IProject, Document {}

const projectSchema = new mongoose.Schema <IProjectDocument>({
    title:{type:String, required:true , trim:true},
    description:{type:String, required:true},
    createdBy:{type:Schema.Types.ObjectId, required:true , ref:"users" },
    orgId:{type:Schema.Types.ObjectId, required:true, ref:"organization"}

})

const Project = mongoose.model <IProjectDocument>("Project", projectSchema, "project")

export default Project;