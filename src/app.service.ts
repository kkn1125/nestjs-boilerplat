import { DatabasesService } from '@databases/databases.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(private prisma: DatabasesService) {}

  getHello(): string {
    return 'Hello World!';
  }
}
