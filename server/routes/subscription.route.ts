import { Router } from "express";
import asyncWrapper from "../utils/asyncWrapper";
import { handleSubscription } from "../controllers/subscription.controller";
import apiError from "../utils/apiError";

const subscriptionRoute = Router();

subscriptionRoute.route("/buy/:subscriptionid/:userid")
    .post(asyncWrapper(handleSubscription))

subscriptionRoute.use(apiError)

export default subscriptionRoute;