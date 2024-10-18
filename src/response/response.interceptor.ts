import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Logger } from '@util/Logger';
import { Request, Response } from 'express';
import { map, Observable } from 'rxjs';
import { OkResponse } from './ok.response.entity';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const http = context.switchToHttp();
    const req = http.getRequest<Request>();
    const res = http.getResponse<Response>();
    const logger = new Logger(this);
    const statusCode = res.statusCode;
    const method = req.method.toUpperCase();
    const originalUrl = req.originalUrl;

    return next.handle().pipe(
      map((data) => {
        logger.log(
          `Response ${statusCode} [${method}] ${originalUrl} <---`,
          data,
        );
        return new OkResponse(statusCode, data);
      }),
    );
  }
}
