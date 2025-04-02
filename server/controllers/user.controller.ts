import { Request, Response } from "express"
import ApiResponse from "../utils/apiResponse"

const healthCheckUp = (req:Request , res:Response)=>{
    return ApiResponse.success([], "Routes are working fine", 200).send(res)
}

export {
    healthCheckUp
}
