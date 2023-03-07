import {HttpException, Injectable, Logger, UnauthorizedException} from '@nestjs/common';
import {CatsRequestDto} from "./dto/cats.request.dto";
import {Cat} from "./cats.schema";
import {Model} from "mongoose";
import {InjectModel} from "@nestjs/mongoose";
import * as bcrypt from 'bcrypt';
import {CatsRepository} from "./cats.repository";

@Injectable()
export class CatsService {

    // DB 에 등록하기 위해서는 dependencyInjection 해줘야 한다
    // Dependency Injection is basically providing the objects that an object
    // needs instead of having its constructs them itself

    // Once you have registered the schema, you can inject a Cat model into
    // the CatService using the @InjectModel() decorator
    constructor(private readonly catsRepository: CatsRepository) {
    }

    private logger = new Logger('HTTP');

    // signup
    async signup(body: CatsRequestDto) {
        const {email, name, password} = body;

        const isNameExist = await this.catsRepository.existsByEmail(email);
        // const isNameExist = await this.catModel.exists({email})

        if (isNameExist) {
            throw new UnauthorizedException('중복된 이메일 입니다.');
        }

        // 암호화
        const hashedPassword = await bcrypt.hash(password, 10);

        // 순서 중요? 아님
        const cat = await this.catsRepository.create({
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
