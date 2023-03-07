import {Injectable, UnauthorizedException} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import {ExtractJwt, Strategy} from "passport-jwt";
import {Payload} from "./jwt.payload";
import {CatsRepository} from "../../cats/cats.repository";
require('dotenv').config(); // load the environment variables in your application

const JWT_TOKEN = process.env.TOKEN_SECRET;

// jwtStrategy - 인증할 때 사용
// auth.module.ts - jwt 생성
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly catsRepository: CatsRepository) { // jwt 전략
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),   // header 에 토큰 추출
            // secretOrKey: `${process.env.TOKEN_SECRET}`,   // 시크릿 키
            secretOrKey: process.env.TOKEN_SECRET,   // 시크릿 키
            ignoreExpiration: false     // jwt 는 만료기간이 있다.
        });
    }

    // front 에서 토큰을 받고 인증한다
    async validate(payload: Payload) {
        // decoding 된 payload 를 받는다
        const cat = await this.catsRepository.findCatByIdWithoutPassword(
            payload.sub,    // sub = cat.id
        );

        if (cat) {
            return cat; // request.user
        } else {
            throw new UnauthorizedException('접근 오류');
        }
    }
}