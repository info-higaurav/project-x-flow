import express from 'express'
import cookieParser from 'cookie-parser';
import cors from 'cors'

const app = express();

// config
app.use(express.json())
app.use(cors())
app.use(cookieParser())

import userRoute from '../routes/user.routes';

app.use("/api/v1/users", userRoute)

export default app;