import {Request, Response, Router} from 'express'

const userRoute = Router()

import { 
healthCheckUp
} from '../controllers/user.controller';

userRoute.route("/health")
    .get(healthCheckUp)
export default userRoute;