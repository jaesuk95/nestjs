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
    Put,
    UseFilters,
    UseInterceptors
} from '@nestjs/common';
import {CatsService} from "./cats.service";
import {HttpExceptionFilter} from "../common/exception/http-exception-filter";
import {SuccessInterceptor} from "../common/interceptor/success.interceptor";
import {CatsRequestDto} from "./dto/cats.request.dto";
import {ApiOperation, ApiResponse} from "@nestjs/swagger";
import {ReadOnlyCatDto} from "./dto/cat.dto";

@Controller('api/')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)    // 전체적으로 exception 잡기
export class CatsController {
    // 서비스
    constructor(private readonly catService: CatsService) {}

    // 회원가입
    @ApiOperation({summary: '회원가입'})    // 스웨거 전용
    @ApiResponse({status: 200, description: '정상등록', type: ReadOnlyCatDto})
    @ApiResponse({status: 500, description: 'server error'})
    @Post('public/register')
    async signUp(@Body() body: CatsRequestDto) {
        return await this.catService.signup(body);
    }

    @ApiOperation({summary: '전체조회'})    // 스웨거 전용
    @Get()
    @UseFilters(HttpExceptionFilter)        // filtering
    getAllCat() {
        // throw new HttpException({success: false, message: 'api is broken'}, 401);   // customException 여기서 아쉬운점 exception 을 하나로 만들자
        throw new HttpException('api broken', 401); // 여기서 exception 이 터지면 filtering 으로 전달된다.
        return {cats: 'get all cat API'};
    }

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
