import { Controller, Get } from '@nestjs/common';
import * as pkg from '../package.json';

@Controller('health')
export class AppController {
  @Get()
  getHealth() {
    return { version: pkg.version };
  }
}
