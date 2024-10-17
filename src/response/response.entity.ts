import { ResponseProtocol } from '@common/protocol';
import { TIMESTAMP_FORMAT } from '@common/variable';
import * as dayjs from 'dayjs';

interface ResponseEntityProps {
  statusCode: number;
  protocol: (typeof ResponseProtocol)[keyof typeof ResponseProtocol];
  path: string;
}
export class ResponseEntity {
  statusCode: number;
  errorCode: number;
  errorMessage: string;
  path: string;
  timestamp: string;
  constructor({ statusCode, protocol, path }: ResponseEntityProps) {
    const { code, message } = protocol;
    this.statusCode = statusCode;
    this.errorCode = code;
    this.errorMessage = message;
    this.path = path;
    this.timestamp = dayjs().format(TIMESTAMP_FORMAT);
  }
}
