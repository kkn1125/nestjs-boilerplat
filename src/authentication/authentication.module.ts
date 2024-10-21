import { Module } from '@nestjs/common';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { DatabasesModule } from '@databases/databases.module';
import { Logger } from '@util/Logger';

@Module({
  imports: [DatabasesModule],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, Logger],
})
export class AuthenticationModule {}
