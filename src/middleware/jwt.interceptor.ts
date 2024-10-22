import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtInterceptor implements NestInterceptor {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromCookie(request);

    console.log('interceptor token:', token);

    if (token) {
      try {
        const payload = this.jwtService.verify(token, {
          secret: this.configService.get('common.SECRET_KEY'),
        });
        request['user'] = payload; // req에 user 프로퍼티 추가
      } catch (err) {
        // JWT 검증 실패 시 필요한 작업 수행
      }
    }

    return next.handle();
  }

  private extractTokenFromCookie(request: Request): string | undefined {
    return request.cookies?.token; // 쿠키에서 토큰 추출
  }
}
