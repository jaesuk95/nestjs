import { Injectable } from '@nestjs/common';

// 의존성 주입, 스프링에서는 마치 @Service 같은 개념
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
