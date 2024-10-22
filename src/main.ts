import commonConf from '@config/commonConf';
import { ConfigService, ConfigType } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Logger } from '@util/Logger';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './response/response.interceptor';
import { ResponseExceptionFilter } from './response/response.filter';
import * as cookieParser from 'cookie-parser';
import { JwtInterceptor } from './middleware/jwt.interceptor';
import { JwtService } from '@nestjs/jwt';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger();
  const configService = app.get(ConfigService);
  const common = configService.get<ConfigType<typeof commonConf>>('common');

  app.use(cookieParser());

  app.setGlobalPrefix('api');

  // jwt interceptor가 먼저 적용되려면?
  app.useGlobalInterceptors(
    new JwtInterceptor(new JwtService(), configService),
    new ResponseInterceptor(),
  );
  app.useGlobalFilters(new ResponseExceptionFilter());

  // app.enableVersioning({
  //   type: VersioningType.URI,
  //   defaultVersion: '1',
  // });
  app.enableCors({
    origin: '*',
    credentials: true,
  });

  await app.listen(common.PORT, common.HOST, () => {
    logger.log(`server listening on http://localhost:${common.PORT}`);
  });
}
bootstrap();
