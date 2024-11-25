import { Document } from 'mongoose';
export declare enum TaskStatus {
    All = "All",
    ToDo = "To Do",
    InProgress = "In Progress",
    Done = "Done"
}
export declare class Task extends Document {
    task_id: string;
    title: string;
    description: string;
    status: TaskStatus;
    start_task_date: Date | null;
    end_task_date: Date | null;
}
export declare const TaskSchema: import("mongoose").Schema<Task, import("mongoose").Model<Task, any, any, any, Document<unknown, any, Task> & Task & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Task, Document<unknown, {}, import("mongoose").FlatRecord<Task>> & import("mongoose").FlatRecord<Task> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
