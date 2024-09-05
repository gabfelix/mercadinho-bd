import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { CreateUserDto, ExportUserDto, UpdateUserDto } from './user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  /** Gets a specific user
   * @param userWhereUniqueInput - The unique identifier for the user
   * @returns The matched user
   */
  async one(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<ExportUserDto> {
    const user = await this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
    if (!user) throw new NotFoundException('Usuário não encontrado');
    return this.prismaToExportDto(user);
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
  }): Promise<ExportUserDto[]> {
    const { cursor, where, orderBy } = params;
    // TODO: Error checking
    const users = await this.prisma.user.findMany({
      cursor,
      where,
      orderBy,
    });
    return users.map((user) => this.prismaToExportDto(user));
  }

  /** Creates a new user
   * @param params - The data to create the user with
   * @returns The created user
   */
  async create(params: CreateUserDto): Promise<ExportUserDto> {
    const data = this.dtoToPrisma(params);
    const user = await this.prisma.user.create({ data }).catch((e) => {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          const target = e.meta?.target?.[0] ?? '';
          const field = target[0].toUpperCase() + target.slice(1);
          throw new BadRequestException(`${field} já está em uso`);
        }
      }
    });

    if (!user) throw new BadRequestException('Erro ao criar usuário');

    return this.prismaToExportDto(user);
  }

  async update(id: number, params: UpdateUserDto): Promise<ExportUserDto> {
    const where: Prisma.UserWhereUniqueInput = { id };
    const data: Prisma.UserUpdateInput = {
      name: params.name,
      email: params.email,
      password: params.password,
      profilePicture: params.encodedProfilePicture
        ? Buffer.from(params.encodedProfilePicture, 'base64')
        : undefined,
    };
    const updateUser = await this.prisma.user.update({ where, data });
    if (!updateUser) throw new NotFoundException('Usuário não encontrado');
    return this.prismaToExportDto(updateUser);
  }

  /**
   * Deletes a specific user
   * @param where The where clause
   * @returns The deleted user
   */
  async delete(id: number): Promise<ExportUserDto> {
    const where = { id };
    const deletedUser = await this.prisma.user
      .delete({
        where,
      })
      .catch((e) => {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
          if (e.code === 'P2025') {
            throw new NotFoundException('Usuário não encontrado');
          }
        }
      });

    if (!deletedUser) throw new NotFoundException('Usuário não encontrado');
    return this.prismaToExportDto(deletedUser);
  }

  //#region private methods
  /** Converts the Prisma-compatible user type to a DTO */
  private prismaToExportDto(user: User): ExportUserDto {
    return {
      name: user.name,
      email: user.email,
      password: user.password,
      encodedProfilePicture: user.profilePicture?.toString('base64'),
    };
  }

  private dtoToPrisma(
    user: CreateUserDto | UpdateUserDto,
  ): Prisma.UserCreateInput {
    return {
      name: user.name,
      email: user.email,
      password: user.password,
      profilePicture: user.encodedProfilePicture
        ? Buffer.from(user.encodedProfilePicture, 'base64')
        : undefined,
    };
  }
  //#endregion
}
