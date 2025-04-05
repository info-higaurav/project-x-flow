import { Router } from "express";
import asyncWrapper from "../utils/asyncWrapper";
import { handleCreateTask } from "../controllers/task.controllers";
import apiError from "../utils/apiError";

const taskRoutes = Router();

taskRoutes.route("/create-task")
    .post(asyncWrapper(handleCreateTask))

taskRoutes.use(apiError)

export default taskRoutes;