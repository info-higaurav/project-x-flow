import { Router } from "express";
import asyncWrapper from "../utils/asyncWrapper";
import { handleCreateProject } from "../controllers/project.controllers";
import apiError from "../utils/apiError";

const projectRoutes = Router()

projectRoutes.route("/create/:userid")
    .post(asyncWrapper(handleCreateProject))

projectRoutes.use(apiError)

export default projectRoutes;