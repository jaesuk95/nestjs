import {Document, SchemaOptions} from "mongoose";
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {IsEmail, IsNotEmpty, IsString} from "class-validator";

// DB 에서 생성될 떄 timestamp 를 찍어준다.
const options: SchemaOptions = {
    timestamps: true
};

@Schema(options)
export class Cat extends Document {

    @Prop({
        required: true,
        unique: true
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @Prop({required: true})
    name: string;

    @Prop({
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    password: string;

    @Prop({
        required: true
    })
    @IsString()
    imgUrl: string;

}

export const CatSchema = SchemaFactory.createForClass(Cat);