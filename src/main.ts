import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {HttpExceptionFilter} from "./common/exception/http-exception-filter";
import {ValidationPipe} from "@nestjs/common";
import {DocumentBuilder, OpenAPIObject, SwaggerModule} from "@nestjs/swagger";
const PORT = process.env.SERVER_PORT;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe())  // 등록해야만 class validation 이 된다 (schema)
  app.useGlobalFilters(new HttpExceptionFilter());

  // swagger initialise setup
  const config = new DocumentBuilder()
      .setTitle('CAT APP')
      .setDescription('cat')
      .setVersion('1.0.0')
      .build();
  const swaggerURI = 'docs';
  const document : OpenAPIObject = SwaggerModule.createDocument(app,config);
  SwaggerModule.setup(swaggerURI, app, document);

  console.log(`swagger is initiating at ${process.env.SERVER_URL}/${swaggerURI}`)

  await app.listen(PORT);
}

bootstrap();
