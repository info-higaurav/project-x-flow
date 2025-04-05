import mongoose,{Document, Schema} from "mongoose";

interface IOrg {
    title:string
    description:string
    createdBy:Schema.Types.ObjectId | null
    subscriptionId:Schema.Types.ObjectId | null
}
export interface IOrgDocument extends IOrg, Document {}

const orgSchema = new mongoose.Schema <IOrgDocument>({
    title:{type:String, required:true},
    description:{type:String, required:true},
    createdBy:{type:Schema.Types.ObjectId, ref:"users" },
    subscriptionId:{type:Schema.Types.ObjectId, ref:"subscription", default:null }
},
{timestamps:true}
)

const Org = mongoose.model<IOrgDocument>("Org", orgSchema, "organization")

export default Org;