import {Injectable} from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport";

// FRONT (api request) ->
// 1. JWT Guard ->
// 2. JWT Strategy ->
// secret key ->
// api response
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
// 자동으로 jwt-strategy 가 실행

}

// JwtAuthGuard 를 주입받게 되면 -> JwtStrategy 에 validate 함수가 실행이 된다.
// 그리고 JwtStrategy 안에 있는 super 는 jwt 에 대한 설정이다