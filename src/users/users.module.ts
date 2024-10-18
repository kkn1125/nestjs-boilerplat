import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabasesModule } from '@databases/databases.module';

@Module({
  imports: [DatabasesModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
