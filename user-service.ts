import { Injectable } from '@nestjs/common';
import { Users } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findOneByEmail(email: string): Promise<Users | null> {
    return this.prisma.users.findUnique({
      where: { email },
    });
  }


  async findOneById(id: string) {
    return this.prisma.users.findUnique({
      where: { id },
    });
  }}