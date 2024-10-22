import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabasesModule } from '@databases/databases.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule, DatabasesModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
