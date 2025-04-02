import {Request, Response, Router} from 'express'

const userRoute = Router()

import asyncWrapper from '../utils/asyncWrapper';
import { 
healthCheckUp
} from '../controllers/user.controller';


userRoute.route("/health")
    .get(asyncWrapper(healthCheckUp))


export default userRoute;