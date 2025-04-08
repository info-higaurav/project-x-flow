import mongoose,{Document, Schema} from "mongoose";

interface ISubscription {
    organizationId:Schema.Types.ObjectId
    planName:string
    projectLimit:number
    teamLimit:number
    activeFrom:Date
    expiredAt:Date
    paymentCycle: "monthly" | "Annually"
    isActive:boolean
}

interface ISubscriptionDocument extends ISubscription ,Document{}

const subscriptionSchema = new mongoose.Schema<ISubscriptionDocument>({
    organizationId:{type:Schema.Types.ObjectId, required:true, trim:true},
    planName:{type:String, required:true, trim:true},
    projectLimit:{type:Number, required:true},
    teamLimit:{type:Number, required:true},
    activeFrom:{type:Date , required:true},
    expiredAt:{type:Date , required:true},
    paymentCycle:{type:String, enum:["monthly","annually"], default:"monthly", required:true},
    isActive:{type:Boolean, required:true, default:false}
})

const Subscription = mongoose.model<ISubscriptionDocument>("Subscription",subscriptionSchema,"subscriptions")

export default Subscription;