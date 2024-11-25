"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const task_entity_1 = require("./entities/task.entity");
let TaskService = class TaskService {
    constructor(taskModel) {
        this.taskModel = taskModel;
    }
    async findAll(query) {
        try {
            const searchFilter = {};
            if (query.search) {
                searchFilter.$or = [
                    { title: { $regex: query.search, $options: 'i' } },
                    { description: { $regex: query.search, $options: 'i' } },
                ];
            }
            let sortOptions = {};
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
                }
                else {
                    sortOptions = { created_at: -1 };
                }
            }
            else {
                sortOptions = { created_at: -1 };
            }
            console.log('Sort Options:', sortOptions);
            const tasks = await this.taskModel.find(searchFilter).sort(sortOptions);
            const count = await this.taskModel.countDocuments(searchFilter);
            return {
                count,
                taskList: tasks,
            };
        }
        catch (error) {
            console.error('Error in findAll function while fetching tasks:', error);
            throw error;
        }
    }
    async findOne(id) {
        try {
            const task = await this.taskModel.findById(id);
            if (!task)
                throw new common_1.NotFoundException('Task not found');
            return task;
        }
        catch (error) {
            console.error(`Error in findOne function while fetching task details. Error: ${error}`);
            throw error;
        }
    }
    async create(createTaskDto) {
        try {
            const task = new this.taskModel(createTaskDto);
            const result = await task.save();
            return {
                task_id: result.task_id,
            };
        }
        catch (error) {
            console.error(`Error in create function while creating task. Error: ${error}`);
            throw error;
        }
    }
    async update(id, updateTaskDto) {
        try {
            const task = await this.taskModel.findById(id);
            if (!task)
                throw new common_1.BadRequestException('Task with the same id does not exist');
            Object.assign(task, updateTaskDto);
            const result = await task.save();
            return {
                task_id: result.task_id,
            };
        }
        catch (error) {
            console.error(`Error in update function while updating task. Error: ${error}`);
            throw error;
        }
    }
    async delete(id) {
        try {
            const task = await this.taskModel.findById(id);
            if (!task) {
                throw new common_1.BadRequestException('Task with the same id does not exist');
            }
            await this.taskModel.deleteOne({ _id: id });
            return true;
        }
        catch (error) {
            console.error(`Error in delete function while deleting task. Error: ${error}`);
            throw error;
        }
    }
};
exports.TaskService = TaskService;
exports.TaskService = TaskService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(task_entity_1.Task.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], TaskService);
//# sourceMappingURL=tasks.service.js.map