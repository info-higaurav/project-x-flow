import { NextFunction, Request, Response } from "express";
import { taskValSchema } from "../validation/task.validation";
import TaskService from "../service/task.service";
import ApiResponse from "../utils/apiResponse";

const handleCreateTask = async(req:Request , res:Response , next:NextFunction)=>{
    const payload = req.body;

    const validatePayload = taskValSchema.parse(payload);
    
    const taskService = new TaskService()
    const createTask = taskService.createTask(validatePayload);

    return ApiResponse.success([createTask], "Task has been created and assigned", 201).send(res);
}

export {
    handleCreateTask
}