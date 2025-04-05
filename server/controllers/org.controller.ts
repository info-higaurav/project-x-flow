import { NextFunction, Request, Response } from "express";
import { orgValSchema } from "../validation/organization.validation";
import OrgService from "../service/org.service";
import ApiResponse from "../utils/apiResponse";

const handleCreateOrg = async(req:Request, res:Response, next:NextFunction)=>{
    const userId = req.params.userid
    const payload = {...req.body , createdBy:userId}
    const verifyPayload = orgValSchema.parse(payload)

    const orgService = new OrgService ()
    const createOrg = await orgService.createOrg(verifyPayload);

    return ApiResponse.success([createOrg], "Organization has been created successfully").send(res);

}

export{
    handleCreateOrg
}