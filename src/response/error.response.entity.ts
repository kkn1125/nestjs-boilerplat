import { ResponseProtocol } from '@common/protocol';
import { TIMESTAMP_FORMAT } from '@common/variable';
import * as dayjs from 'dayjs';

interface ErrorResponseEntityProps {
  statusCode: number;
  protocol: (typeof ResponseProtocol)[keyof typeof ResponseProtocol];
  path: string;
  method: string;
  detail: string | unknown;
}
export class ErrorResponseEntity {
  ok: boolean;
  statusCode: number;
  errorCode: number;
  errorMessage: string;
  path: string;
  method: string;
  detail: string | unknown;
  timestamp: string;

  constructor({
    statusCode,
    protocol,
    path,
    method,
    detail,
  }: ErrorResponseEntityProps) {
    const { code, message } = protocol;
    this.ok = [200, 201].includes(code);
    this.statusCode = statusCode;
    this.errorCode = code;
    this.errorMessage = message;
    this.method = method;
    this.path = path;
    this.detail = detail;
    this.timestamp = dayjs().format(TIMESTAMP_FORMAT);
  }
}
