import {ExceptionFilter, Catch, ArgumentsHost, HttpException} from "@nestjs/common";
import {Request, Response} from "express";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();    // ctx = context 실행 환경에 대해서
        const response = ctx.getResponse<Response>();   //  response 가져오기
        const request = ctx.getRequest<Request>();  // request 가져오기
        const status = exception.getStatus();
        const error = exception.getResponse() as
            | string
            | {error: string; statusCode: number; message: string | string []};


        // 만약 에러가 string 일 경우
        if (typeof error === 'string') {
            response.status(status)
                .json({
                    statusCode: status,
                    timestamp: new Date().toISOString(),
                    path: request.url,
                    error_message: error
                });
        } else {    // nest js 자체에서 에러가 발생하면 여기로
            response.status(status).json({
                success: false,
                timestamp: new Date().toISOString(),
                ...error
            });
        }

    }
}