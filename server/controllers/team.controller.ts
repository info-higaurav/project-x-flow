import { NextFunction, Request, Response } from "express";
import TeamService from "../service/team.service";
import { teamScheam } from "../validation/team.validation";
import ApiResponse from "../utils/apiResponse";

const handleCreateTeam = async(req:Request , res:Response, next:NextFunction)=>{
    const userid = req.params.userid;

    const payload = {...req.body, createdBy:userid}

    const teamService = new TeamService()
    const validatePayload = teamScheam.parse(payload);

    const createTeam = await teamService.createTeam(validatePayload);

    return ApiResponse.success([createTeam], "Team has been created Successfully", 201).send(res);

}

export {
    handleCreateTeam
}