import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {HttpExceptionFilter} from "./common/exception/http-exception-filter";
import {ValidationPipe} from "@nestjs/common";
import {DocumentBuilder, OpenAPIObject, SwaggerModule} from "@nestjs/swagger";
import * as expressBasicAuth from "express-basic-auth";
const PORT = process.env.SERVER_PORT;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe())  // 등록해야만 class validation 이 된다 (schema)
  app.useGlobalFilters(new HttpExceptionFilter());

  app.use(
      ['/docs','/docs-json'],
      expressBasicAuth({
        challenge: true,
        users: {
          [process.env.SWAGGER_USER]: process.env.SWAGGER_PASSWORD,
        }
      })
  )

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

  app.enableCors({
    origin: true,   // 다 허용
    // origin: 'http://ocalhost:3000',
    credentials: true
  })
  await app.listen(PORT);
}

bootstrap();
