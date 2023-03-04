import {IsEmail, IsNotEmpty} from "class-validator";

export class CatsRequestDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    name: string;
}