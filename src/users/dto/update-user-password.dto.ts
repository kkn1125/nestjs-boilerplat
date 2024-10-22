import { PartialType } from '@nestjs/mapped-types';
import { User } from '@prisma/client';

class UpdatePasswordDto implements Pick<User, 'password'> {
  password: string;
  changePassword: string;
}

export class UpdateUserPasswordDto extends PartialType(UpdatePasswordDto) {}
