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
