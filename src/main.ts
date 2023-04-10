import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {HttpExceptionFilter} from "./common/exception/http-exception-filter";
import {ValidationPipe} from "@nestjs/common";
import {DocumentBuilder, OpenAPIObject, SwaggerModule} from "@nestjs/swagger";
import * as expressBasicAuth from "express-basic-auth";

const PORT = process.env.SERVER_PORT;
import * as path from "path";
import {NestExpressApplication} from "@nestjs/platform-express";

async function bootstrap() {
    // NestExpressApplication 을 추가하면 app 이 확실하게 express app 이 된다.
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.useGlobalPipes(new ValidationPipe())  // 등록해야만 class validation 이 된다 (schema)
    app.useGlobalFilters(new HttpExceptionFilter());

    app.use(
        ['/docs', '/docs-json'],
        expressBasicAuth({
            challenge: true,
            users: {
                [process.env.SWAGGER_USER]: process.env.SWAGGER_PASSWORD,
            }
        })
    )

    // 스태틱 이미지 가져오기 위해서는 미들웨어가 필요하다
    // 스태틱 이미지 http://localhost:8000/media/cats/aa.png
    // useStaticAssets 을 사용하기 위해서는 NestExpressApplication 을 추가해야 한다
    app.useStaticAssets(path.join(__dirname, './common', 'uploads'), {
        prefix: '/media'
    });

    // swagger initialise setup
    const config = new DocumentBuilder()
        .setTitle('CAT APP')
        .setDescription('cat')
        .setVersion('1.0.0')
        .build();
    const swaggerURI = 'docs';
    const document: OpenAPIObject = SwaggerModule.createDocument(app, config);
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
