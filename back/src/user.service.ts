import { Prisma, User } from '@prisma/client';
import { PrismaService } from './prisma.service';
import { NotFoundException } from '@nestjs/common';

export class UserService {
  constructor(private prisma: PrismaService) {}

  async user(userWhereUniqueInput: Prisma.UserWhereUniqueInput): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
    if (!user) throw new NotFoundException('Usuário não encontrado');
    return user;
  }

  async users(params: {
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> {
    const { cursor, where, orderBy } = params;
    // TODO: Error checking
    return await this.prisma.user.findMany({
      cursor,
      where,
      orderBy,
    });
  }
}
