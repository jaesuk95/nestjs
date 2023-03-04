import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {HttpExceptionFilter} from "./common/exception/http-exception-filter";
const PORT = process.env.SERVER_PORT;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(PORT);
}
bootstrap();
