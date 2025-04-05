import { Router } from "express";
import asyncWrapper from "../utils/asyncWrapper";
import { handleCreateTeam } from "../controllers/team.controller";
import apiError from "../utils/apiError";

const teamRoute = Router()

teamRoute.route("/create-team/:userid")
    .post(asyncWrapper(handleCreateTeam))

teamRoute.use(apiError)

export default teamRoute;