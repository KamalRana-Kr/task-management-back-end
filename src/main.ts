import { NestApplication, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import swaggerInit from './swagger';
import { ConfigService } from '@nestjs/config';
import { HttpExceptionFilter } from './middlewares/http-exception.filter';

async function bootstrap() {
  const app: NestApplication = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT');
  const host = configService.get<string>('API_HOST');

  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());

  await swaggerInit(app);
  await app.listen(port);
  console.log(
    `Task management API Service with pid:${process.pid} listening on port:${port}`,
  );
  console.log(
    `Docs will serve on ${host}/task-management/api/docs for Task management`,
  );
}
bootstrap();
