import {Injectable} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import {ExtractJwt, Strategy} from "passport-jwt";


// jwtStrategy - 인증할 때 사용
// auth.module.ts - jwt 생성
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() { // jwt 전략
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),   // header 에 토큰 추출
            secretOrKey: `${process.env.TOKEN_SECRET}`,   // 시크릿 키
            ignoreExpiration: false     // jwt 는 만료기간이 있다.
        });
    }

    // front 에서 토큰을 받고 인증한다
    // async validate(payload) {
    //
    // }
}