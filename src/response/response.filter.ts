import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ResponseEntity } from './response.entity';
import { ResponseProtocol } from '@common/protocol';

@Catch(HttpException)
export class ResponseExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest<Request>();
    const res = ctx.getResponse<Response>();
    const statusCode = exception.getStatus();

    console.log(exception.message);

    res.status(statusCode).json(
      new ResponseEntity({
        statusCode,
        protocol: ResponseProtocol[exception.message],
        path: req.path,
      }),
    );
  }
}
