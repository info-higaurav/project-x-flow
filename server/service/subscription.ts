import Org from "../model/organization.model";
import Plan from "../model/plan.model";
import Sub from "../model/subscription.model";
import { ISubscription } from "../validation/subscription.validation";

class Subscription {
    async getPlan (planId:string){
        const res = await Plan.findById(planId)
        return res;
    }

    async createSubscription(payload:ISubscription){
        const createsub = await Sub.create(payload)
        return createsub;
    }

    async updateSub (orgId:string , subId:string){
        const updateOrg = await Org.findByIdAndUpdate(orgId,{subscriptionId:subId},{new:true})
        return updateOrg;
    }
}

export default Subscription;