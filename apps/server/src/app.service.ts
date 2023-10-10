import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}
  getHello(): string {
    return 'Hello World!';
  }

  async getUsers() {
    return await this.prisma.user.findMany();
  }

  async addUser() {
    const user =  await this.prisma.user.create({
      'data': {
        'email': '1@1.com',
        'name': 'jjj'
      }
    });
    console.log(user);
    return user;
  }
}
