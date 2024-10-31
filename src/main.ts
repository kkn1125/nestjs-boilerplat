import commonConf from '@config/commonConf';
import { ConfigService, ConfigType } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Logger } from '@util/Logger';
import * as cookieParser from 'cookie-parser';
import * as path from 'path';
import { AppModule } from './app.module';
import { InterceptorMiddleware } from './middleware/interceptor.middleware';
import { JwtInterceptor } from './middleware/jwt.interceptor';
import { ResponseExceptionFilter } from './response/response.filter';
import { ResponseInterceptor } from './response/response.interceptor';
import { RequestMethod } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger();
  const configService = app.get(ConfigService);
  const common = configService.get<ConfigType<typeof commonConf>>('common');

  app.use(cookieParser());

  app.setGlobalPrefix('api', {
    exclude: [
      {
        path: 'views/:path*',
        method: RequestMethod.ALL,
      },
    ],
  });

  // jwt interceptor가 먼저 적용되려면?
  app.useGlobalInterceptors(
    new JwtInterceptor(new JwtService(), configService),
    new ResponseInterceptor(),
  );
  app.useGlobalFilters(new ResponseExceptionFilter());
  app.use(InterceptorMiddleware);

  // app.enableVersioning({
  //   type: VersioningType.URI,
  //   defaultVersion: '1',
  // });

  app.enableCors({
    origin: '*',
    credentials: true,
  });

  const httpAdapter = app.getHttpAdapter();
  httpAdapter.setViewEngine('ejs');
  httpAdapter.setBaseViewsDir(path.join(path.resolve(), 'public/views'));
  httpAdapter.useStaticAssets(path.join(path.resolve(), 'public/assets'));

  await app.listen(common.PORT, common.HOST, async () => {
    logger.log(`server listening on ${await app.getUrl()}`);
  });
}
bootstrap();
