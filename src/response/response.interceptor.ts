import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Logger } from '@util/Logger';
import { Request } from 'express';
import { map, Observable } from 'rxjs';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const http = context.switchToHttp();
    const req = http.getRequest<Request>();
    const logger = new Logger(this);
    const statusCode = req.statusCode;
    const method = req.method.toUpperCase();
    const originalUrl = req.originalUrl;
    return next.handle().pipe(
      map((data) => {
        logger.log(
          `Response ${statusCode} [${method}] ${originalUrl} <---`,
          data,
        );
        return data;
      }),
    );
  }
}
