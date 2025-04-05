import {Request, Response, Router} from 'express'
import apiError from '../utils/apiError';

const userRoute = Router()

import asyncWrapper from '../utils/asyncWrapper';
import { 
    handleCreateUser,
    handleLogin,
healthCheckUp,
registerUser
} from '../controllers/user.controller';

userRoute.route("/health")
    .get(asyncWrapper(healthCheckUp))

userRoute.route("/register")
    .post(asyncWrapper(registerUser))

userRoute.route("/login")
    .post(asyncWrapper(handleLogin))

userRoute.route("/create-user")
    .post(asyncWrapper(handleCreateUser))

userRoute.use(apiError)

export default userRoute;