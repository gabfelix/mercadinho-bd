import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma, Provider } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ProviderService {
  constructor(private readonly prismaService: PrismaService) {}

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
}
