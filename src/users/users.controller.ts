import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserWithoutPasswordDto } from './dto/update-user-without-password.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Patch(':id')
  updateWithoutPassword(
    @Param('id') id: string,
    @Body() updateUserWithoutPasswordDto: UpdateUserWithoutPasswordDto,
  ) {
    return this.usersService.updateWithoutPassword(
      +id,
      updateUserWithoutPasswordDto,
    );
  }

  @Patch(':id/password')
  updatePassword(@Param('id') id: string, @Body() password: string) {
    return this.usersService.updatePassword(+id, password);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
