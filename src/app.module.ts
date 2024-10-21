import commonConf from '@config/commonConf';
import databaseConf from '@config/databaseConf';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabasesModule } from './databases/databases.module';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { UsersModule } from './users/users.module';
import { AuthenticationModule } from './authentication/authentication.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [commonConf, databaseConf],
    }),
    DatabasesModule,
    UsersModule,
    AuthenticationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .exclude('/health') // 헬스체커만 제외
      .forRoutes({ path: '*', method: RequestMethod.ALL }); // 모든 경로
  }
}
