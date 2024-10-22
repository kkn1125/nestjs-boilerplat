import { CustomException } from '@/response/custom.exception';
import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromCookie(request);

    console.log('guard token:', token);

    if (!token) {
      throw new CustomException('UnauthorizedError', HttpStatus.UNAUTHORIZED);
    }

    try {
      const payload = this.jwtService.verify(token, {
        secret: this.configService.get('common.SECRET_KEY'),
      });
      request['user'] = payload;
    } catch (error) {
      throw new CustomException('InvalidTokenError', HttpStatus.UNAUTHORIZED);
    }

    return true;
  }

  private extractTokenFromCookie(request: Request): string | undefined {
    return request.cookies?.token; // 쿠키에서 토큰 추출
  }
}
