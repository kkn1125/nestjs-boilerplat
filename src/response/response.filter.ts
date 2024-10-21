import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ErrorResponseEntity } from './error.response.entity';
import { ResponseProtocol } from '@common/protocol';
import { Logger } from '@util/Logger';

@Catch(HttpException)
export class ResponseExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const req = ctx.getRequest<Request>();
    const res = ctx.getResponse<Response>();
    const statusCode = exception.getStatus();
    const method = req.method.toUpperCase();
    const originalUrl = req.originalUrl;
    const logger = new Logger(this);

    logger.log(ResponseProtocol, exception.message, {
      statusCode,
      protocol: ResponseProtocol[exception.message],
      path: req.path,
      method,
    });

    const protocol =
      exception.message in ResponseProtocol
        ? ResponseProtocol[exception.message]
        : ResponseProtocol.UnknownError;
    const detail = exception.message || exception.cause;

    const errorResponse = new ErrorResponseEntity({
      statusCode,
      protocol,
      path: req.path,
      method,
      detail,
    });

    logger.log(
      `Response ${statusCode} [${method}] ${originalUrl} <---`,
      errorResponse,
    );

    res.status(statusCode).json(errorResponse);
  }
}
