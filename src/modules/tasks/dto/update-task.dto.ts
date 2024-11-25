import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTaskDto {
  @ApiProperty({
    description: 'Current status of the task',
    example: 'Done',
    required: false,
  })
  @IsNotEmpty()
  @IsString()
  status: string;
}
