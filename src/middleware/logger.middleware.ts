import { Injectable, NestMiddleware } from '@nestjs/common';
import { Logger } from '@util/Logger';
import { Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    const logger = new Logger(this);
    const method = req.method.toUpperCase();
    const originalUrl = req.originalUrl;
    const queries = req.query;
    const params = req.params;
    const body = req.body;

    logger.log(`Request [${method}] ${originalUrl} --->`);
    logger.log('> queries:', queries);
    logger.log('> params:', params);
    logger.log('> body:', body);
    next();
  }
}
