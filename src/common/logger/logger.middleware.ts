import {Injectable, Logger, NestMiddleware} from '@nestjs/common';
import {NextFunction,Request,Response} from "express";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {

  // http 에 관한 로거, nest 에서 제공하는 logger 이며 스프링에서 @sl4js
  private logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    // response 가 완료되었을때 로거를 출력한다
    res.on('finish', () => {
      this.logger.log(
          `${req.ip} ${req.method} ${res.statusCode}`,
          req.originalUrl,
          );
    });

    next();
  }
}
