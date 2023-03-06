import {IsEmail, IsNotEmpty} from "class-validator";
import {ApiProperty, PickType} from "@nestjs/swagger";
import {Cat} from "../cats.schema";

export class CatsRequestDto extends PickType (Cat,['email', 'name', 'password'] as const) {

}