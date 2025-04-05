import Project from "../model/project.model";
import { IProjectSchema } from "../validation/project.validation";

class ProjectService {
    async createProject (payload:IProjectSchema){
        const res = await Project.create(payload);
        return res;
    }
}

export default ProjectService;