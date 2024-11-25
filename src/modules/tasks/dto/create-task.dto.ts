import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({
    description: 'Title of the task',
    example: 'Work on task management the project',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Detailed description of the task',
    example: 'Finish implementing the task module',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Current status of the task',
    example: 'To Do',
    required: false,
  })
  @IsOptional()
  @IsString()
  status?: string;

  @ApiProperty({
    description: 'Start date of the task, if completed',
    example: '2024-09-25T10:00:00.000Z',
    required: true,
  })
  @IsOptional()
  @IsString()
  start_task_date?: Date;

  @ApiProperty({
    description: 'Completion date of the task, if completed',
    example: '2024-09-25T12:00:00.000Z',
    required: true,
  })
  @IsOptional()
  @IsString()
  end_task_date?: Date;
}
