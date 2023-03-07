import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Put, Req,
    UseFilters, UseGuards,
    UseInterceptors
} from '@nestjs/common';
import {CatsService} from "./cats.service";
import {HttpExceptionFilter} from "../common/exception/http-exception-filter";
import {SuccessInterceptor} from "../common/interceptor/success.interceptor";
import {CatsRequestDto} from "./dto/cats.request.dto";
import {ApiOperation, ApiResponse} from "@nestjs/swagger";
import {ReadOnlyCatDto} from "./dto/cat.dto";
import {AuthService} from "../auth/auth.service";
import {LoginRequestDto} from "../auth/dto/login.request.dto";
import {JwtAuthGuard} from "../auth/jwt/jwt.guard";
import { Request } from 'express';
import {CurrentUser} from "../common/decorator/user.decorator";

@Controller('api/')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)    // 전체적으로 exception 잡기
export class CatsController {
    // 서비스
    constructor(
        private readonly catService: CatsService,
        private readonly authService: AuthService
    ) {}

    // 회원가입
    @ApiOperation({summary: '회원가입'})    // 스웨거 전용
    @ApiResponse({status: 200, description: '정상등록', type: ReadOnlyCatDto})
    @ApiResponse({status: 500, description: 'server error'})
    @Post('public/register')
    async signUp(@Body() body: CatsRequestDto) {
        return await this.catService.signup(body);
    }

    @ApiOperation({summary: '로그인'})
    @Post('public/login')
    @UseFilters(HttpExceptionFilter)
    async login(@Body() body: LoginRequestDto) {
        return await this.authService.jwtLogIn(body)
    }

    @ApiOperation({summary: '현재 고양이 가져오기'})    // 스웨거 전용
    @UseGuards(JwtAuthGuard)
    @Get('public/profile')
    // @UseFilters(HttpExceptionFilter)        // filtering
    getAllCat(@Req() request: Request) {
        return request.user;
    }

    @ApiOperation({summary: '현재 고양이 가져오기 V2'})    // 스웨거 전용
    @UseGuards(JwtAuthGuard)
    @Get('public/profile/v2')
    // @UseFilters(HttpExceptionFilter)        // filtering
    currentUser(@CurrentUser() cat) {   // @SimpleUser 와 비슷한 개념이지만,
        return cat.readOnlyData;
    }

    // 로그아웃은 필요가 없다, 이유, 프론트에서 토큰을 제거하면 된다.

    // throw new HttpException({success: false, message: 'api is broken'}, 401);   // customException 여기서 아쉬운점 exception 을 하나로 만들자
    // throw new HttpException('api broken', 401); // 여기서 exception 이 터지면 filtering 으로 전달된다.
    // return {cats: 'get all cat API'};

    // ParseIntPipe = @PathVariable('id') Long id
    @Get(':id')
    getCat(@Param('id', ParseIntPipe) param) {
        console.log(param)
        console.log(typeof param);
        return {id: `${param}`, name: 'cat'};
    }

    @Post()
    createCat() {
        return '200';
    }

    @Put()
    updateCat() {
        return '200';
    }

    @Patch(':id')
    partialUpdate() {
        return '200';
    }

    @Delete(':id')
    deleteCat() {
        return '200';
    }
}
