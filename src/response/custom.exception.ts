import { ResponseProtocol } from '@common/protocol';
import { HttpException } from '@nestjs/common';

export class CustomException extends HttpException {
  constructor(reason: keyof ResponseProtocol, status: number) {
    console.log(reason, status);
    super(reason, status);
  }
}
