import mongoose, { Document, Schema } from "mongoose";

interface ITask {
    title: string;
    description: string;
    status: "pending" | "inprogress" | "completed";
    assignedBy: Schema.Types.ObjectId;
    assignedTo: Schema.Types.ObjectId;
    projectId: Schema.Types.ObjectId;
    createdAt: Date;
    dueDate: Date;
    completedAt: Date | null;
}

interface ITaskDocument extends ITask, Document {}

const taskScheam = new mongoose.Schema<ITaskDocument>({
    title:{type:String, required:true , trim:true},
    description:{type:String, required:true},
    status:{type:String, required:true},
    assignedBy:{type:Schema.Types.ObjectId , required:true , ref:"user"},
    assignedTo:{type:Schema.Types.ObjectId , required:true , ref:"user"},
    projectId:{type:Schema.Types.ObjectId, required:true , ref:"project"},
    createdAt:{type:Date, required:true},
    dueDate:{type:Date, required:true},
    completedAt:{type:Date, default:null}

})

const Task = mongoose.model<ITaskDocument>("Task", taskScheam, "task")

export default Task
