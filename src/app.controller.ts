import {Body, Controller, Get, Param, Req} from '@nestjs/common';
import {AppService} from './app.service';

@Controller('api')
export class AppController {
  // AppService 는 마치 공급된 제품을 받아서 사용자에게 마치 사용할 수 있게끔 한다, 결국 controller 가 주입을 받아서 사용하게 된다.
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
