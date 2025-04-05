import { Router } from "express";
import asyncWrapper from "../utils/asyncWrapper";
import { handleCreateOrg } from "../controllers/org.controller";
import apiError from "../utils/apiError";
const orgRoutes = Router()

orgRoutes.route("/create/:userid")
    .post(asyncWrapper(handleCreateOrg))

orgRoutes.use(apiError)

export default orgRoutes;