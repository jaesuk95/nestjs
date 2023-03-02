import {Body, Controller, Get, Param, Req} from '@nestjs/common';
import {AppService} from './app.service';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  // param 과 body 를 받는 방법
  @Get('hello/:id/:name')
  getHello(@Req() req: Request,
           @Body() body,
           @Param() param: {id: string; name: string}): string {
    console.log(req)

    // body 이렇게 받을 수 있지만 @Body
    // const body = req.body;
    console.log(param);

    console.log(param.id);
    console.log(param.name);

    return this.appService.getHello();
  }

}
