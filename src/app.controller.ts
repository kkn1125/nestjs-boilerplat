import { Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CustomException } from './response/custom.exception';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Version(['2'])
  @Get()
  getHello() {
    return this.appService.getHello();
  }

  @Post('/:id')
  getTest(@Param('id') id: string) {
    console.log('get id:', id);
    throw new CustomException('NotFoundUserError', HttpStatus.BAD_REQUEST);
    return this.appService.getHello();
  }
}
