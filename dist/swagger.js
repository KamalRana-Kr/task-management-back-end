"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
async function default_1(app) {
    const logger = new common_1.Logger();
    const docName = 'Task Management';
    const docDesc = 'BaseUrl Database: http://localhost:3000';
    const docVersion = '1.0';
    const docPrefix = 'task-management/api/docs';
    const documentBuild = new swagger_1.DocumentBuilder()
        .setTitle(docName)
        .setDescription(docDesc)
        .setVersion(docVersion)
        .addTag(`API's`)
        .addServer(`/`)
        .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'defaultBearerAuth')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, documentBuild, {
        deepScanRoutes: true,
    });
    swagger_1.SwaggerModule.setup(docPrefix, app, document, {
        explorer: true,
        customSiteTitle: docName,
    });
    logger.log(`-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.`);
    logger.log(`-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.`);
}
//# sourceMappingURL=swagger.js.map