import {Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import ApiResponse from "./apiResponse";

export default function apiError (
    err:Error,
    req:Request,
    res:Response,
    next:NextFunction
){
    if(err instanceof ZodError){     
        console.log(err.issues)   
        return ApiResponse.failure([], err?.issues[0].message || err.errors[0]?.message, 400).send(res)
    }
    console.log(err)
}