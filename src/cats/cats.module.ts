import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Module({
    controllers: [CatsController],
    providers: [CatsService],
    exports: [CatsService]  // 외부로 내보내기, 다른 컨트롤러에서
})
export class CatsModule {}
