import {HttpException, Injectable, Logger, UnauthorizedException} from '@nestjs/common';
import {CatsRequestDto} from "./dto/cats.request.dto";
import {Cat} from "./cats.schema";
import {Model} from "mongoose";
import {InjectModel} from "@nestjs/mongoose";
import * as bcrypt from 'bcrypt';

@Injectable()
export class CatsService {
    constructor(@InjectModel(Cat.name) private readonly catModel: Model<Cat>) {
    }

    private logger = new Logger('HTTP');

    // signup
    async signup(body: CatsRequestDto) {
        const {email, name, password} = body;
        const isNameExist = await this.catModel.exists({email})

        if (isNameExist) {
            throw new UnauthorizedException('중복된 이메일 입니다.');
        }

        // 암호화
        const hashedPassword = await bcrypt.hash(password, 10);
        const cat = await this.catModel.create({
            email,
            name,
            password: hashedPassword
        });

        // virtual field data (returns only selected data)
        const catData = cat.readOnlyData;

        this.logger.log(`Created new user id = ${cat.id}`);
        return catData;
    }

}
