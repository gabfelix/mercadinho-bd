import { BadRequestException, Injectable } from '@nestjs/common';
import { Contact, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ContactService {
  constructor(private readonly prismaService: PrismaService) {}

  async one(id: number): Promise<Contact> {
    const where: Prisma.ContactWhereUniqueInput = { id };
    const contact = await this.prismaService.contact.findUnique({
      where,
    });
    if (!contact) throw new BadRequestException('Contato não encontrado');
    return contact;
  }

  async many(params: {
    cursor?: Prisma.ContactWhereUniqueInput;
    where?: Prisma.ContactWhereInput;
    orderBy?: Prisma.ContactOrderByWithRelationInput;
  }): Promise<Contact[]> {
    const { cursor, where, orderBy } = params;
    const contacts = await this.prismaService.contact.findMany({
      cursor,
      where,
      orderBy,
    });
    return contacts;
  }

  async create(data: Prisma.ContactCreateInput): Promise<Contact> {
    const createdContact = await this.prismaService.contact
      .create({ data })
      .catch((e) => {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
          if (e.code === 'P2002') {
            const target = e.meta?.target?.[0] ?? '';
            const field = target[0].toUpperCase() + target.slice(1);
            throw new BadRequestException(`${field} já está em uso`);
          }
        }
        throw e;
      });
    if (!createdContact) throw new BadRequestException('Erro ao criar contato');

    return createdContact;
  }
}