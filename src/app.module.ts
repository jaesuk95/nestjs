import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import {LoggerMiddleware} from "./common/logger/logger.middleware";

@Module({
  imports: [CatsModule],  // 모듈을 연결시키는
  controllers: [AppController],
  providers: [AppService],  // AppService 가 바로 공급자다
})
// CatsModule, UserModule 이 생성되었으며, 여기서 AppModule 로 합쳐져서 메인에서 실행이 된다.
// middleware logger 적용하기
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');   // * 전체에 logger 바인딩
  }
}


// providers : Nest 인젝터에 의해 인스턴스화되고 적어도 이 모듈에서 공유 될 수있는 공급자
// controllers : 인스턴스화 되어야하는 모듈에정의 된 컨트롤러 세트
// imports : 이 모듈에 필요한 공급자를 내보내는 가져온 모듈 목록
// exports : providers 이 모듈에서 제공하는 부분 집합이며이 이 모듈을 가져 오는 다른 모듈에서 사용할 수 있어야합니다.