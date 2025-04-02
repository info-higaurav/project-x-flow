import { Request, Response } from "express"

const healthCheckUp = (req:Request , res:Response)=>{
    res.status(200).json({message:"Routes are working fine"})
}

export {
    healthCheckUp
}
