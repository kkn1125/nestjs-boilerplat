import { Role, User } from '@prisma/client';

type ExcludeId<T> = Omit<T, 'id' | 'createdAt' | 'updatedAt'>;
export class CreateUserDto implements ExcludeId<User> {
  email: string;
  username: string;
  password: string;
  role: Role;
}
