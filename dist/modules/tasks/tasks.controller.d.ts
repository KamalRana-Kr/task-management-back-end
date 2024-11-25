import { TaskService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { IResponse, TaskCreateInterface, TaskListInterface, TaskUpdateInterface } from './tasks.interfaces';
import { Task } from './entities/task.entity';
import { TaskQueryDto } from './dto/find-all-task-dto';
export declare class TaskController {
    private readonly taskService;
    constructor(taskService: TaskService);
    private handleError;
    findAll(query: TaskQueryDto): Promise<IResponse<TaskListInterface>>;
    findOne(id: string): Promise<IResponse<Task>>;
    create(createTaskDto: CreateTaskDto): Promise<IResponse<TaskCreateInterface>>;
    update(id: string, updateTaskDto: UpdateTaskDto): Promise<IResponse<TaskUpdateInterface>>;
    delete(id: string): Promise<IResponse<boolean>>;
}
