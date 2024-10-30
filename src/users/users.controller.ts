import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserInfoDto } from './dto/update-user-info.dto';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';
import { UpdateDataValidatePipe } from './pipe/update-data-validate.pipe';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '@/guard/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('condition')
  findCondition(@Query() query: Record<string, string>) {
    console.log('query:', query);
    return this.usersService.findAllCondition(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    console.log('createUserDto:', createUserDto);
    return this.usersService.create(createUserDto);
  }

  @UsePipes(UpdateDataValidatePipe)
  @Patch(':id/info')
  updateUserInfo(
    @Param('id') id: string,
    @Body() updateUserInfoDto: UpdateUserInfoDto,
  ) {
    return this.usersService.updateUserInfo(+id, updateUserInfoDto);
  }

  @UsePipes(UpdateDataValidatePipe)
  @Patch(':id/password')
  updatePassword(
    @Param('id') id: string,
    @Body() updateUserPasswordDto: UpdateUserPasswordDto,
  ) {
    return this.usersService.updatePassword(+id, updateUserPasswordDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
