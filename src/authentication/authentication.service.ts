import { DatabasesService } from '@databases/databases.service';
import { HttpStatus, Injectable } from '@nestjs/common';
import { SignInDto } from './dto/sign-in.dto';
import { CustomException } from '@/response/custom.exception';
import { PasswordEncoder } from '@util/PasswordEncoder';
import { Logger } from '@util/Logger';
import { Redis } from 'ioredis';
import { RedisService } from '@liaoliaots/nestjs-redis';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import * as CryptoJS from 'crypto-js';
import { EXPIRE_TIME } from '@common/variable';

@Injectable()
export class AuthenticationService {
  redis: Redis | null;

  constructor(
    private readonly logger: Logger,
    private readonly prisma: DatabasesService,
    private readonly redisService: RedisService,
    private readonly configService: ConfigService,
  ) {
    this.redis = this.redisService.getOrThrow();
  }

  async signIn(signInDto: SignInDto) {
    const { email, password } = signInDto;

    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new CustomException('NotFoundUserError', HttpStatus.NOT_FOUND);
    }

    const isPasswordMatch = PasswordEncoder.matches(password, user.password);
    if (!isPasswordMatch) {
      throw new CustomException(
        'PasswordNotMatchError',
        HttpStatus.BAD_REQUEST,
      );
    }

    const sessionId = this.generateSessionId();

    const userInfo = {
      id: user.id,
      email: user.email,
      username: user.username,
    };

    try {
      // Redis에 세션 정보 저장 (만료 시간 설정)
      await this.redis.set(
        sessionId,
        JSON.stringify(userInfo),
        'EX',
        EXPIRE_TIME,
      ); // 1시간 후 만료
    } catch (error) {
      this.logger.error('Redis 세션 저장 실패', error);
      throw new CustomException(
        'SessionStorageError',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const payload = {
      sub: user.id,
      sessionId: sessionId,
      userInfo,
    };
    const jwtToken = this.generateJwtToken(payload);

    const { password: _password, ...result } = user;

    return { user: result, jwtToken };
  }

  async signOut(sessionId: string) {
    try {
      await this.redis.del(sessionId);
      return sessionId;
    } catch (error) {
      this.logger.error('Redis 세션 삭제 실패', error);
      throw new CustomException(
        'SessionDeletionError',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async refresh(token: string) {
    let decoded: { sessionId: string };

    try {
      decoded = jwt.verify(
        token,
        this.configService.get('common.SECRET_KEY'),
      ) as { sessionId: string };
    } catch (error) {
      throw new CustomException('InvalidTokenError', HttpStatus.UNAUTHORIZED);
    }
    const sessionId = decoded.sessionId;
    const userInfo = await this.redis.get(sessionId);
    if (!userInfo) {
      throw new CustomException(
        'NotFoundSessionError',
        HttpStatus.UNAUTHORIZED,
      );
    }
    const userInfoJson = JSON.parse(userInfo);

    try {
      // 기존 세션 삭제
      await this.redis.del(sessionId);

      // 새로운 세션 ID 생성
      const newSessionId = this.generateSessionId();

      // 새로운 세션 정보 저장
      await this.redis.set(
        newSessionId,
        JSON.stringify(userInfoJson),
        'EX',
        EXPIRE_TIME,
      );

      const payload = {
        sub: userInfoJson.id,
        sessionId: newSessionId,
        userInfo: userInfoJson,
      };
      const jwtToken = this.generateJwtToken(payload);

      return { userInfo: userInfoJson, jwtToken };
    } catch (error) {
      this.logger.error('Redis 세션 갱신 실패', error);
      throw new CustomException(
        'SessionRefreshError',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private generateJwtToken(payload: any): string {
    return jwt.sign(payload, this.configService.get('common.SECRET_KEY'));
  }

  private generateSessionId(): string {
    return CryptoJS.lib.WordArray.random(16).toString();
  }
}
