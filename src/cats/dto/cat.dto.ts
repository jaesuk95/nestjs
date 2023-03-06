import {ApiProperty, PickType} from "@nestjs/swagger";
import {IsEmail, IsNotEmpty} from "class-validator";
import {Cat} from "../cats.schema";

// PickType = Cat Schema 에서 골라오기, 현재 email, name 만 가져오기
export class ReadOnlyCatDto extends PickType (Cat,['email', 'name'] as const) {
    @ApiProperty({  // 스웨거 전용
        example: '1',
        description: 'user_id',
        required: true
    })
    id: string;
}