import { PartialType } from '@nestjs/mapped-types';
import { Role, User } from '@prisma/client';

type ExcludeId<T> = Omit<T, 'id' | 'password' | 'createdAt' | 'updatedAt'>;
class CreateUserWithoutPasswordDto implements ExcludeId<User> {
  email: string;
  username: string;
  role: Role;
}

export class UpdateUserWithoutPasswordDto extends PartialType(
  CreateUserWithoutPasswordDto,
) {}
