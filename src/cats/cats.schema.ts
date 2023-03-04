import {Document, SchemaOptions} from "mongoose";
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {IsEmail, IsNotEmpty, IsString} from "class-validator";

// DB 에서 생성될 떄 timestamp 를 찍어준다.
const options: SchemaOptions = {
    timestamps: true
};
//          timestamps examples
//         "createdAt": "2023-03-04T16:26:10.658Z",
//         "updatedAt": "2023-03-04T16:26:10.658Z",

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
    @IsString()
    @IsNotEmpty()
    name: string;

    @Prop({
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    password: string;

    @Prop()
    @IsString()
    imgUrl: string;

    readonly readOnlyData: { id: string; email: string; name: string };
}

export const CatSchema = SchemaFactory.createForClass(Cat);

// 필요한것만 리턴, 비밀번호는 제외
CatSchema.virtual('readOnlyData').get(function (this:Cat) {
    return {
        id: this.id,
        email: this.email,
        name: this.name
    };
});
