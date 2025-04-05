import Task from "../model/task.model";
import { ITask } from "../validation/task.validation";

class TaskService{
    async createTask (payload:ITask){
        const createTask = await Task.create(payload);
        return createTask;
    }
}

export default TaskService;