import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpException,
  UseGuards,
  Query,
} from '@nestjs/common';
import { TaskService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiResponse,
  ApiBody,
} from '@nestjs/swagger';
import {
  IResponse,
  TaskCreateInterface,
  TaskListInterface,
  TaskUpdateInterface,
} from './tasks.interfaces';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';
import { Task } from './entities/task.entity';
import { TaskQueryDto } from './dto/find-all-task-dto';

@ApiTags('Tasks')
@Controller({
  version: '1',
  path: 'tasks/',
})
export class TaskController {
  constructor(private readonly taskService: TaskService) { }

  private handleError(error: any): HttpException {
    return new HttpException(
      {
        status: error.status || HttpStatus.INTERNAL_SERVER_ERROR,
        message: error.message,
        trace: error.response || error,
      },
      error.status || HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  //Find all
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('defaultBearerAuth')
  @ApiOperation({ summary: 'Fetch all tasks' })
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: 'Successfully fetched task list.',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error.',
  })
  @Get()
  async findAll(
    @Query() query: TaskQueryDto,
  ): Promise<IResponse<TaskListInterface>> {
    console.log('query', query);

    try {
      console.log('Received query parameters:', query);

      const taskLists = await this.taskService.findAll(query);

      return {
        status: HttpStatus.OK,
        message: 'Task list fetched successfully',
        data: taskLists,
      };
    } catch (error) {
      console.log('Error in Fetch all tasks function::', error);

      throw this.handleError(error);
    }
  }

  // Find details
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('defaultBearerAuth')
  @ApiOperation({ summary: 'Fetch task details by ID' })
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: 'Successfully fetched task details.',
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Task not found.' })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<IResponse<Task>> {
    try {
      const taskDetails = await this.taskService.findOne(id);
      return {
        status: HttpStatus.OK,
        message: 'Task details fetched successfully',
        data: taskDetails,
      };
    } catch (error) {
      console.log('Error in Fetch task details by ID function::', error);

      throw this.handleError(error);
    }
  }

  // Add task
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('defaultBearerAuth')
  @ApiOperation({ summary: 'Create a new task' })
  @ApiOkResponse({
    status: HttpStatus.CREATED,
    description: 'Task created successfully.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input data.',
  })
  @ApiBody({ type: CreateTaskDto })
  @Post()
  async create(
    @Body() createTaskDto: CreateTaskDto,
  ): Promise<IResponse<TaskCreateInterface>> {
    try {
      const taskDetails = await this.taskService.create(createTaskDto);
      return {
        status: HttpStatus.CREATED,
        message: 'Task created successfully',
        data: taskDetails,
      };
    } catch (error) {
      console.log('Error in Create a new task function::', error);

      throw this.handleError(error);
    }
  }

  //Update task
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('defaultBearerAuth')
  @ApiOperation({ summary: 'Update task status by ID' })
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: 'Task updated successfully.',
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Task not found.' })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input data.',
  })
  @ApiBody({ type: UpdateTaskDto })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<IResponse<TaskUpdateInterface>> {
    try {
      const taskDetails = await this.taskService.update(id, updateTaskDto);
      return {
        status: HttpStatus.OK,
        message: 'Task status updated successfully',
        data: taskDetails,
      };
    } catch (error) {
      console.log('Error in Uddate task status function::', error);

      throw this.handleError(error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('defaultBearerAuth')
  @ApiOperation({ summary: 'Soft delete a task by ID' })
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: 'Task deleted successfully.',
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Task not found.' })
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<IResponse<boolean>> {
    try {
      const taskDetails = await this.taskService.delete(id);
      return {
        status: HttpStatus.OK,
        message: 'Task deleted successfully',
        data: taskDetails,
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }
}
