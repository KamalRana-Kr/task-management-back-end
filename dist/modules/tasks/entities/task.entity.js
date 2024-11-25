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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskSchema = exports.Task = exports.TaskStatus = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const uuid_1 = require("uuid");
var TaskStatus;
(function (TaskStatus) {
    TaskStatus["All"] = "All";
    TaskStatus["ToDo"] = "To Do";
    TaskStatus["InProgress"] = "In Progress";
    TaskStatus["Done"] = "Done";
})(TaskStatus || (exports.TaskStatus = TaskStatus = {}));
let Task = class Task extends mongoose_1.Document {
};
exports.Task = Task;
__decorate([
    (0, mongoose_2.Prop)({
        required: true,
        default: () => (0, uuid_1.v4)(),
    }),
    __metadata("design:type", String)
], Task.prototype, "task_id", void 0);
__decorate([
    (0, mongoose_2.Prop)({ required: true }),
    __metadata("design:type", String)
], Task.prototype, "title", void 0);
__decorate([
    (0, mongoose_2.Prop)({ required: true }),
    __metadata("design:type", String)
], Task.prototype, "description", void 0);
__decorate([
    (0, mongoose_2.Prop)({
        type: String,
        enum: TaskStatus,
        default: TaskStatus.ToDo,
    }),
    __metadata("design:type", String)
], Task.prototype, "status", void 0);
__decorate([
    (0, mongoose_2.Prop)({ type: Date, default: null }),
    __metadata("design:type", Date)
], Task.prototype, "start_task_date", void 0);
__decorate([
    (0, mongoose_2.Prop)({ type: Date, default: null }),
    __metadata("design:type", Date)
], Task.prototype, "end_task_date", void 0);
exports.Task = Task = __decorate([
    (0, mongoose_2.Schema)({ timestamps: true })
], Task);
exports.TaskSchema = mongoose_2.SchemaFactory.createForClass(Task);
//# sourceMappingURL=task.entity.js.map