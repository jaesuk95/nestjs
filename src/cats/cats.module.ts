import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import {MongooseModule} from "@nestjs/mongoose";
import {Cat, CatSchema} from "./cats.schema";

@Module({
    // 해당 스키마를 등록해서, 스키마를 서비스,컨트롤러에 사용할 수 있게끔 한다
    imports: [MongooseModule.forFeature([{name:Cat.name, schema: CatSchema}])],
    controllers: [CatsController],
    providers: [CatsService],
    exports: [CatsService]  // 외부로 내보내기, 다른 컨트롤러에서
})
export class CatsModule {}
