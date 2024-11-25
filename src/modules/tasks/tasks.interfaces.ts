import { Task } from './entities/task.entity';

export interface IResponse<T> {
  status: number;
  message?: string;
  data?: T;
}

export interface TaskListInterface {
  count: number;
  taskList: Task[];
}

export interface TaskCreateInterface {
  task_id: string;
}

export interface TaskUpdateInterface {
  task_id: string;
}
