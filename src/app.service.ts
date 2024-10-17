import { DatabasesService } from '@databases/databases.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(private prisma: DatabasesService) {}

  async getHello(): Promise<string> {
    const users = await this.prisma.user.findMany();
    console.log(users);
    return 'Hello World!';
  }
}
