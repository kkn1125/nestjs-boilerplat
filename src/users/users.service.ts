import { CustomException } from '@/response/custom.exception';
import { DatabasesService } from '@databases/databases.service';
import { HttpStatus, Injectable } from '@nestjs/common';
import { PasswordEncoder } from '@util/PasswordEncoder';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserWithoutPasswordDto } from './dto/update-user-without-password.dto';

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
    const encodedPassword = PasswordEncoder.encode(createUserDto.password);
    const userData = { ...createUserDto, password: encodedPassword };

    const createdUser = await this.prisma.user.create({
      data: { ...userData },
    });
    const { password: _password, ...userWithoutPassword } = createdUser;
    return userWithoutPassword;
  }

  async updateWithoutPassword(
    id: number,
    updateUserWithoutPasswordDto: UpdateUserWithoutPasswordDto,
  ) {
    try {
      await this.prisma.user.findUniqueOrThrow({ where: { id } });
    } catch {
      throw new CustomException('NotFoundUserError', HttpStatus.NOT_FOUND);
    }

    const user = await this.prisma.user.update({
      where: { id },
      data: updateUserWithoutPasswordDto,
    });

    const { password: _password, ...result } = user;
    return result;
  }

  updatePassword(id: number, password: string) {
    const encodedPassword = PasswordEncoder.encode(password);
    return this.prisma.user.update({
      where: { id },
      data: { password: encodedPassword },
    });
  }

  remove(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }
}
