import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async getUsers() {
    return this.prismaService.user.findMany();
  }

  async getUser(username: string) {
    return this.prismaService.user.findUnique({
      where: {
        username,
      },
    });
  }

  async createUser(user: Prisma.UserCreateInput) {
    return this.prismaService.user.create({
      data: user,
    });
  }
}
