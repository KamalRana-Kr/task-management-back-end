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
exports.TaskController = void 0;
const common_1 = require("@nestjs/common");
const tasks_service_1 = require("./tasks.service");
const create_task_dto_1 = require("./dto/create-task.dto");
const update_task_dto_1 = require("./dto/update-task.dto");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/jwt.auth.guard");
const find_all_task_dto_1 = require("./dto/find-all-task-dto");
let TaskController = class TaskController {
    constructor(taskService) {
        this.taskService = taskService;
    }
    handleError(error) {
        return new common_1.HttpException({
            status: error.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR,
            message: error.message,
            trace: error.response || error,
        }, error.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR);
    }
    async findAll(query) {
        console.log('query', query);
        try {
            console.log('Received query parameters:', query);
            const taskLists = await this.taskService.findAll(query);
            return {
                status: common_1.HttpStatus.OK,
                message: 'Task list fetched successfully',
                data: taskLists,
            };
        }
        catch (error) {
            console.log('Error in Fetch all tasks function::', error);
            throw this.handleError(error);
        }
    }
    async findOne(id) {
        try {
            const taskDetails = await this.taskService.findOne(id);
            return {
                status: common_1.HttpStatus.OK,
                message: 'Task details fetched successfully',
                data: taskDetails,
            };
        }
        catch (error) {
            console.log('Error in Fetch task details by ID function::', error);
            throw this.handleError(error);
        }
    }
    async create(createTaskDto) {
        try {
            const taskDetails = await this.taskService.create(createTaskDto);
            return {
                status: common_1.HttpStatus.CREATED,
                message: 'Task created successfully',
                data: taskDetails,
            };
        }
        catch (error) {
            console.log('Error in Create a new task function::', error);
            throw this.handleError(error);
        }
    }
    async update(id, updateTaskDto) {
        try {
            const taskDetails = await this.taskService.update(id, updateTaskDto);
            return {
                status: common_1.HttpStatus.OK,
                message: 'Task status updated successfully',
                data: taskDetails,
            };
        }
        catch (error) {
            console.log('Error in Uddate task status function::', error);
            throw this.handleError(error);
        }
    }
    async delete(id) {
        try {
            const taskDetails = await this.taskService.delete(id);
            return {
                status: common_1.HttpStatus.OK,
                message: 'Task deleted successfully',
                data: taskDetails,
            };
        }
        catch (error) {
            throw this.handleError(error);
        }
    }
};
exports.TaskController = TaskController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('defaultBearerAuth'),
    (0, swagger_1.ApiOperation)({ summary: 'Fetch all tasks' }),
    (0, swagger_1.ApiOkResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Successfully fetched task list.',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
        description: 'Internal server error.',
    }),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_all_task_dto_1.TaskQueryDto]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('defaultBearerAuth'),
    (0, swagger_1.ApiOperation)({ summary: 'Fetch task details by ID' }),
    (0, swagger_1.ApiOkResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Successfully fetched task details.',
    }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.NOT_FOUND, description: 'Task not found.' }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('defaultBearerAuth'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new task' }),
    (0, swagger_1.ApiOkResponse)({
        status: common_1.HttpStatus.CREATED,
        description: 'Task created successfully.',
    }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Invalid input data.',
    }),
    (0, swagger_1.ApiBody)({ type: create_task_dto_1.CreateTaskDto }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_task_dto_1.CreateTaskDto]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('defaultBearerAuth'),
    (0, swagger_1.ApiOperation)({ summary: 'Update task status by ID' }),
    (0, swagger_1.ApiOkResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Task updated successfully.',
    }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.NOT_FOUND, description: 'Task not found.' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.BAD_REQUEST,
        description: 'Invalid input data.',
    }),
    (0, swagger_1.ApiBody)({ type: update_task_dto_1.UpdateTaskDto }),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_task_dto_1.UpdateTaskDto]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('defaultBearerAuth'),
    (0, swagger_1.ApiOperation)({ summary: 'Soft delete a task by ID' }),
    (0, swagger_1.ApiOkResponse)({
        status: common_1.HttpStatus.OK,
        description: 'Task deleted successfully.',
    }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.NOT_FOUND, description: 'Task not found.' }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "delete", null);
exports.TaskController = TaskController = __decorate([
    (0, swagger_1.ApiTags)('Tasks'),
    (0, common_1.Controller)({
        version: '1',
        path: 'tasks/',
    }),
    __metadata("design:paramtypes", [tasks_service_1.TaskService])
], TaskController);
//# sourceMappingURL=tasks.controller.js.map