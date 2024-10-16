import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabasesModule } from './databases/databases.module';
import { ConfigModule } from '@nestjs/config';
import commonConf from '@config/commonConf';
import databaseConf from '@config/databaseConf';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [commonConf, databaseConf],
    }),
    DatabasesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
