import { ResponseProtocol } from '@common/protocol';
import { HttpException } from '@nestjs/common';

export class CustomException extends HttpException {
  constructor(
    reason: keyof ResponseProtocol,
    status: number,
    detail?: string | string[],
  ) {
    super(reason, status, { cause: detail });
  }
}
