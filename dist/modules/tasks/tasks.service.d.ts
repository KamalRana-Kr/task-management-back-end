import { Model } from 'mongoose';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskCreateInterface, TaskListInterface, TaskUpdateInterface } from './tasks.interfaces';
import { TaskQueryDto } from './dto/find-all-task-dto';
export declare class TaskService {
    private taskModel;
    constructor(taskModel: Model<Task>);
    findAll(query: TaskQueryDto): Promise<TaskListInterface>;
    findOne(id: string): Promise<Task>;
    create(createTaskDto: CreateTaskDto): Promise<TaskCreateInterface>;
    update(id: string, updateTaskDto: UpdateTaskDto): Promise<TaskUpdateInterface>;
    delete(id: string): Promise<boolean>;
}
