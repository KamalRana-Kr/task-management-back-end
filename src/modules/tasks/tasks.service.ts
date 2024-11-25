import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import {
  TaskCreateInterface,
  TaskListInterface,
  TaskUpdateInterface,
} from './tasks.interfaces';
import { TaskQueryDto } from './dto/find-all-task-dto';

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) { }

  async findAll(query: TaskQueryDto): Promise<TaskListInterface> {
    try {
      const searchFilter: any = {};

      if (query.search) {
        searchFilter.$or = [
          { title: { $regex: query.search, $options: 'i' } },
          { description: { $regex: query.search, $options: 'i' } },
        ];
      }

      let sortOptions: any = {};

      if (query.sortField) {
        const sortOrder = query.sortOrder === 'desc' ? -1 : 1;

        const validSortFields = [
          'task_id',
          'title',
          'description',
          'createdAt',
          'status',
        ];

        if (validSortFields.includes(query.sortField)) {
          sortOptions[query.sortField] = sortOrder;
        } else {
          sortOptions = { created_at: -1 };
        }
      } else {
        sortOptions = { created_at: -1 };
      }

      console.log('Sort Options:', sortOptions);

      const tasks = await this.taskModel.find(searchFilter).sort(sortOptions);

      const count = await this.taskModel.countDocuments(searchFilter);

      return {
        count,
        taskList: tasks,
      };
    } catch (error) {
      console.error('Error in findAll function while fetching tasks:', error);
      throw error;
    }
  }

  // Fetch a single task by id
  async findOne(id: string): Promise<Task> {
    try {
      const task = await this.taskModel.findById(id);
      if (!task) throw new NotFoundException('Task not found');
      return task;
    } catch (error) {
      console.error(
        `Error in findOne function while fetching task details. Error: ${error}`,
      );
      throw error;
    }
  }

  // Create a new task
  async create(createTaskDto: CreateTaskDto): Promise<TaskCreateInterface> {
    try {
      const task = new this.taskModel(createTaskDto);
      const result = await task.save();
      return {
        task_id: result.task_id,
      };
    } catch (error) {
      console.error(
        `Error in create function while creating task. Error: ${error}`,
      );
      throw error;
    }
  }

  // Update an existing task by id
  async update(
    id: string,
    updateTaskDto: UpdateTaskDto,
  ): Promise<TaskUpdateInterface> {
    try {
      const task = await this.taskModel.findById(id);
      if (!task)
        throw new BadRequestException('Task with the same id does not exist');

      Object.assign(task, updateTaskDto);
      const result = await task.save();
      return {
        task_id: result.task_id,
      };
    } catch (error) {
      console.error(
        `Error in update function while updating task. Error: ${error}`,
      );
      throw error;
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      const task = await this.taskModel.findById(id);
      if (!task) {
        throw new BadRequestException('Task with the same id does not exist');
      }

      await this.taskModel.deleteOne({ _id: id });
      return true;
    } catch (error) {
      console.error(
        `Error in delete function while deleting task. Error: ${error}`,
      );
      throw error;
    }
  }
}
