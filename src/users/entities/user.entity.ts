import { Role, User } from '@prisma/client';

export class UserEntity implements User {
  id: number;
  email: string;
  username: string;
  password: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}
