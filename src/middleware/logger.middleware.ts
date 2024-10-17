import { Injectable, NestMiddleware } from '@nestjs/common';
import { Logger } from '@util/Logger';
import { Request } from 'express';

const logger = new Logger('mid');

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: any, next: () => void) {
    logger.log(req.method, req.originalUrl, '--->');
    next();
  }
}
