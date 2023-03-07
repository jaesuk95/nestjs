import {Injectable, UnauthorizedException} from '@nestjs/common';
import {CatsRepository} from "../cats/cats.repository";
import {LoginRequestDto} from "./dto/login.request.dto";
import * as bcrypt from 'bcrypt';
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthService {
    // CatsRepository 사용하기 위해서는 module 에 등록해야 한다 
    constructor(
        private readonly catsRepository: CatsRepository,
        private jwtService: JwtService) {
    }

    async jwtLogIn(data: LoginRequestDto) {
        const {email, password} = data;

        // 해당하는 email 이 있는지
        const cat = await this.catsRepository.findCatByEmail(email);

        if (!cat) {
            throw new UnauthorizedException('이메일과 비밀번호를 확인해주세요.');
        }

        // password validation
        const isPasswordValidated: boolean = await bcrypt.compare(
            password,
            cat.password
        );

        if (!isPasswordValidated) {
            throw new UnauthorizedException('비밀번호 오류.');
        }

        const payload = {email: email, sub: cat.id}
        return {
            token: this.jwtService.sign(payload),
        }
    }
}
