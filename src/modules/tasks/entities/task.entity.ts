import { Document } from 'mongoose';
import { Prop, Schema as NestSchema, SchemaFactory } from '@nestjs/mongoose';
import { v4 as uuidv4 } from 'uuid';

export enum TaskStatus {
  All = 'All',
  ToDo = 'To Do',
  InProgress = 'In Progress',
  Done = 'Done',
}

@NestSchema({ timestamps: true })
export class Task extends Document {
  @Prop({
    required: true,
    default: () => uuidv4(),
  })
  task_id: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({
    type: String,
    enum: TaskStatus,
    default: TaskStatus.ToDo,
  })
  status: TaskStatus;

  @Prop({ type: Date, default: null })
  start_task_date: Date | null;

  @Prop({ type: Date, default: null })
  end_task_date: Date | null;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
