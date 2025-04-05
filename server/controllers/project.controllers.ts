import { NextFunction, Request, Response } from "express";
import { projectValSchema } from "../validation/project.validation";
import ProjectService from "../service/project.services";
import ApiResponse from "../utils/apiResponse";

export const handleCreateProject = async(req:Request, res:Response, next:NextFunction)=>{
    const userid = req.params.userid
    const payload = {...req.body, createdBy:userid}

    const verifyPaylod = projectValSchema.parse(payload);

    const projectService = new ProjectService()
    const createProject = projectService.createProject(verifyPaylod);

    return ApiResponse.success([createProject], "Project has been created", 201).send(res);

}