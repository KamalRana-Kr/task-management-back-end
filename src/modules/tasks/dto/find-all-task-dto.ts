import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
export class TaskQueryDto {
  @ApiProperty({
    description:
      'The field by which tasks should be sorted. e.g., title, description, created_at.',
    enum: ['task_id', 'title', 'description', 'createdAt', 'status'],
    required: false,
    default: 'title',
  })
  @IsOptional()
  @IsString()
  @IsEnum(['task_id', 'title', 'description', 'createdAt', 'status'])
  sortField?: string = 'title';

  @ApiProperty({
    description:
      'The order in which tasks should be sorted. Either "ascending" or "descending".',
    enum: ['asc', 'desc'],
    required: false,
    default: 'asc',
  })
  @IsOptional()
  @IsString()
  @IsEnum(['asc', 'desc'])
  sortOrder?: 'asc' | 'desc' = 'asc';

  @ApiProperty({
    description: 'Search term for filtering tasks by title or description.',
    required: false,
  })
  @IsOptional()
  @IsString()
  search?: string;
}
