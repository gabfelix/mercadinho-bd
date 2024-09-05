import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, Provider } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ProviderService {
  constructor(private readonly prismaService: PrismaService) {}

  async one(id: number) {
    const where: Prisma.ProviderWhereUniqueInput = { id };
    const provider = await this.prismaService.provider.findUnique({
      where,
    });
    if (!provider) throw new NotFoundException('Fornecedor não encontrado');
    return provider;
  }

  async many(params: {
    cursor?: Prisma.ProviderWhereUniqueInput;
    where?: Prisma.ProviderWhereInput;
    orderBy?: Prisma.ProviderOrderByWithRelationInput;
  }): Promise<Provider[]> {
    const { cursor, where, orderBy } = params;
    const providers = await this.prismaService.provider.findMany({
      cursor,
      where,
      orderBy,
    });
    return providers;
  }

  async create(cnpj: string, contactId: number): Promise<Provider> {
    const data: Prisma.ProviderCreateInput = {
      cnpj,
      contact: { connect: { id: contactId } },
    };
    const createdProvider = await this.prismaService.provider
      .create({ data })
      .catch((e) => {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
          if (e.code === 'P2002') {
            const target = e.meta?.target?.[0] ?? '';
            const field = target[0].toUpperCase() + target.slice(1);
            throw new BadRequestException(`${field} já está em uso`);
          }
        }
        if (e instanceof Prisma.PrismaClientValidationError) {
          throw new BadRequestException('Erro de validação');
        }
      });
    if (!createdProvider)
      throw new BadRequestException('Erro de criação de fornecedor');
    return createdProvider;
  }

  async update(
    id: number,
    { cnpj, contactId }: { cnpj?: string; contactId?: number },
  ): Promise<Provider> {
    const data: Prisma.ProviderUpdateInput = {
      cnpj,
      contact: contactId ? { connect: { id: contactId } } : undefined,
    };
    const updatedProvider = await this.prismaService.provider
      .update({
        where: { id },
        data,
      })
      .catch((e) => {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
          if (e.code === 'P2002') {
            const target = e.meta?.target?.[0] ?? '';
            const field = target[0].toUpperCase() + target.slice(1);
            throw new BadRequestException(`${field} já está em uso`);
          }
        }
        if (e instanceof Prisma.PrismaClientValidationError) {
          throw new BadRequestException('Erro de validação');
        }
      });
    if (!updatedProvider)
      throw new BadRequestException('Erro de atualização de fornecedor');
    return updatedProvider;
  }

  async delete(id: number): Promise<Provider> {
    const deletedProvider = await this.prismaService.provider
      .delete({
        where: { id },
      })
      .catch((e) => {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
          if (e.code === 'P2025') {
            throw new NotFoundException('Fornecedor não encontrado');
          }
        }
      });
    if (!deletedProvider)
      throw new BadRequestException('Erro de exclusão de fornecedor');
    return deletedProvider;
  }
}
