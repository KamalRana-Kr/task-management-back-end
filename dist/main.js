"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const swagger_1 = require("./swagger");
const config_1 = require("@nestjs/config");
const http_exception_filter_1 = require("./middlewares/http-exception.filter");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        bufferLogs: true,
    });
    const configService = app.get(config_1.ConfigService);
    const port = configService.get('PORT');
    const host = configService.get('API_HOST');
    app.enableCors();
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        whitelist: true,
    }));
    app.useGlobalFilters(new http_exception_filter_1.HttpExceptionFilter());
    await (0, swagger_1.default)(app);
    await app.listen(port);
    console.log(`Task management API Service with pid:${process.pid} listening on port:${port}`);
    console.log(`Docs will serve on ${host}/task-management/api/docs for Task management`);
}
bootstrap();
//# sourceMappingURL=main.js.map