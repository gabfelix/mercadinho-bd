import { Prisma, User } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  /** Gets a specific user
   * @param userWhereUniqueInput - The unique identifier for the user
   * @returns The matched user
   */
  async one(userWhereUniqueInput: Prisma.UserWhereUniqueInput): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
    if (!user) throw new NotFoundException('Usuário não encontrado');
    return user;
  }

  /** Gets many users
   * @param cursor - The cursor to start at
   * @param where - The where clause
   * @param orderBy - The order by clause
   * @returns An array of matched users
   */
  async many(params: {
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

  /** Creates a new user
   * @param data - The data to create the user with
   * @returns The created user
   */
  async create(data: Prisma.UserCreateInput): Promise<User> {
    // TODO: Error checking
    return this.prisma.user.create({ data });
  }

  async update(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;
    return this.prisma.user.update({ where, data });
  }

  /**
   * Deletes a specific user
   * @param where The where clause
   * @returns The deleted user
   */
  async delete(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({
      where,
    });
  }
}
