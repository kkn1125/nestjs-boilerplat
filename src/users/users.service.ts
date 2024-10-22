import { CustomException } from '@/response/custom.exception';
import { DatabasesService } from '@databases/databases.service';
import { HttpStatus, Injectable } from '@nestjs/common';
import { PasswordEncoder } from '@util/PasswordEncoder';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserInfoDto } from './dto/update-user-info.dto';
import { User } from '@prisma/client';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: DatabasesService) {}

  findAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        username: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async findOne(id: number) {
    try {
      return await this.prisma.user.findUniqueOrThrow({
        where: { id },
        select: {
          id: true,
          email: true,
          username: true,
          role: true,
          createdAt: true,
          updatedAt: true,
        },
      });
    } catch {
      throw new CustomException('NotFoundUserError', HttpStatus.NOT_FOUND);
    }
  }

  async create(createUserDto: CreateUserDto) {
    // create 메서드를 수정하여 패스워드를 인코딩합니다.

    const existsUser = await this.prisma.user.findUnique({
      where: { email: createUserDto.email },
    });
    if (existsUser) {
      throw new CustomException(
        'AlreadyExistsUserError',
        HttpStatus.BAD_REQUEST,
      );
    }

    const encodedPassword = PasswordEncoder.encode(createUserDto.password);
    const userData = { ...createUserDto, password: encodedPassword };

    const createdUser = await this.prisma.user.create({
      data: { ...userData },
    });
    const { password: _password, ...userWithoutPassword } = createdUser;
    return userWithoutPassword;
  }

  async updateUserInfo(id: number, updateUserInfoDto: UpdateUserInfoDto) {
    try {
      await this.prisma.user.findUniqueOrThrow({ where: { id } });
    } catch {
      throw new CustomException('NotFoundUserError', HttpStatus.NOT_FOUND);
    }

    const user = await this.prisma.user.update({
      where: { id },
      data: updateUserInfoDto,
    });

    const { password: _password, ...result } = user;
    return result;
  }

  async updatePassword(
    id: number,
    updateUserPasswordDto: UpdateUserPasswordDto,
  ) {
    let user: User | null;
    try {
      user = await this.prisma.user.findUniqueOrThrow({ where: { id } });
    } catch (e) {
      console.log(e);
      throw new CustomException('NotFoundUserError', HttpStatus.NOT_FOUND);
    }

    const encodedPassword = PasswordEncoder.encode(
      updateUserPasswordDto.password,
    );

    if (user.password !== encodedPassword) {
      throw new CustomException(
        'PasswordNotMatchError',
        HttpStatus.BAD_REQUEST,
      );
    }

    const encodedChangePassword = PasswordEncoder.encode(
      updateUserPasswordDto.changePassword,
    );

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: { password: encodedChangePassword },
    });

    const { password: _password, ...result } = updatedUser;
    return result;
  }

  remove(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }
}
