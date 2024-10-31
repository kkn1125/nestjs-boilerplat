import commonConf from '@config/commonConf';
import databaseConf from '@config/databaseConf';
import redisConf from '@config/redisConf';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule, ConfigService, ConfigType } from '@nestjs/config';
import { AppController } from './app.controller';
import { AuthenticationModule } from './authentication/authentication.module';
import { DatabasesModule } from './databases/databases.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { UsersModule } from './users/users.module';
import { ViewsModule } from './views/views.module';
import { RouterModule } from '@nestjs/core';
import * as path from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [commonConf, databaseConf, redisConf],
      isGlobal: true,
    }),
    RedisModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const redisConfig =
          configService.get<ConfigType<typeof redisConf>>('redis');
        return {
          readyLog: true,
          config: {
            host: redisConfig.HOST,
            port: redisConfig.PORT,
            password: redisConfig.PASSWORD,
          },
        };
      },
      inject: [ConfigService],
    }),
    DatabasesModule,
    UsersModule,
    AuthenticationModule,
    ViewsModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      // .exclude('/api/health') // 헬스체커만 제외
      .forRoutes({ path: '*', method: RequestMethod.ALL }); // 모든 경로
  }
}
