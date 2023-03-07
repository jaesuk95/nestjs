import {forwardRef, Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";
import {JwtStrategy} from "./jwt/jwt.strategy";
import {CatsModule} from "../cats/cats.module";

const SECRET_KEY = process.env.JWT_KEY;

@Module({
    imports: [
        PassportModule.register({defaultStrategy: 'jwt', session: false}),  // session cookie 를 아직 사용하지 않아 false
        JwtModule.register({
            secret: `${process.env.TOKEN_SECRET}`,
            // secret: process.env.TOKEN_SECRET,
            signOptions: {expiresIn: '1y'}
        }),

        // forwardRef 사용이유, cats.module 에서도 imports 에 auth.module 모듈간의 순환 종속성을 해결 하려한다. 모듀 연관이 입력받아 양쪽에서 동일한 유틸리티 함수를
        forwardRef(() => CatsModule),   // catsModule 전체를 가져온다, Cats module export 에 등록
    ],
    providers: [AuthService, JwtStrategy],
    exports: [AuthService]
})
export class AuthModule {
}
