import { Router } from "express";
import asyncWrapper from "../utils/asyncWrapper";
import { handleCreateOrg } from "../controllers/org.controller";
const orgRoutes = Router()

orgRoutes.route("/create/:userid")
    .post(asyncWrapper(handleCreateOrg))

export default orgRoutes;