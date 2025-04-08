import { NextFunction, Request, Response } from "express";
import Subscription from "../service/subscription";
import { IPlan } from "../model/plan.model";
import ApiResponse from "../utils/apiResponse";
import { ISubscription } from "../validation/subscription.validation";
import UserService from "../service/users.service";

const handleSubscription = async(req:Request, res:Response , next:NextFunction)=>{
    const subService = new Subscription()
    const userService = new UserService()
    
    const {organizationId , paymentCycle} = req.body
    const {subscriptionid,userid} = req.params;
    const plan = await subService.getPlan(subscriptionid)
    const {planName, projectLimit, teamLimit} = plan as IPlan;

    const payload:ISubscription = {
        organizationId:organizationId,
        planName:planName,
        projectLimit:projectLimit,
        teamLimit:teamLimit,
        activeFrom:new Date(),
        expiredAt:new Date(Date.now() + 30 * 24 *60 *60 *1000),
        paymentCycle:paymentCycle,
        isActive:true
    }

    const isUserValid = await userService.getUserById(userid)
   
    if(!isUserValid){
        return ApiResponse.failure([], "User is not exists",400).send(res);
    }

    console.log(payload)
    const buySub = await subService.createSubscription(payload);
    const updateOrgSub = await subService.updateSub(organizationId,String(buySub?._id));
    return ApiResponse.success([updateOrgSub], "Subscription updated successfully",200).send(res);
    

}

export {
    handleSubscription
}