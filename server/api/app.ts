import express from 'express'
import cookieParser from 'cookie-parser';
import cors from 'cors'

const app = express();

// config
app.use(express.json())
app.use(cors())
app.use(cookieParser())

import userRoute from '../routes/user.routes';
import orgRoutes from '../routes/org.routes';
import projectRoutes from '../routes/project.routes';
import teamRoute from '../routes/team.route';
import taskRoutes from '../routes/task.route';

app.use("/api/v1/users", userRoute)
app.use("/api/v1/org" , orgRoutes)
app.use("/api/v1/project", projectRoutes)
app.use("/api/v1/team", teamRoute)
app.use("/api/v1/task", taskRoutes)

export default app;