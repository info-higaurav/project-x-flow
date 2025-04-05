import mongoose,{Document, Schema} from "mongoose";

interface ITeam {
    name:string
    description:string
    createdBy:mongoose.Schema.Types.ObjectId;
    orgId:Schema.Types.ObjectId
    members:[Schema.Types.ObjectId]
}

interface ITeamDocument extends ITeam, Document {}

const teamScheam = new mongoose.Schema <ITeamDocument>({
    name:{type:String, required:true , trim:true},
    description:{type:String, required:true},
    createdBy:{type:Schema.Types.ObjectId , required:true},
    orgId:{type:Schema.Types.ObjectId, required:true},
    members:[{type:Schema.Types.ObjectId, default:null}]

})

const Team = mongoose.model<ITeamDocument>("Team", teamScheam, "team")

export default Team
