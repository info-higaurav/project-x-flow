import {Request, Response, Router} from 'express'
import apiError from '../utils/apiError';

const userRoute = Router()

import asyncWrapper from '../utils/asyncWrapper';
import { 
healthCheckUp,
registerUser
} from '../controllers/user.controller';

userRoute.route("/health")
    .get(asyncWrapper(healthCheckUp))

userRoute.route("/")
    .post(asyncWrapper(registerUser))

userRoute.use(apiError)

export default userRoute;