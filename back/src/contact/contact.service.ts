import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Contact, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ContactService {
  constructor(private readonly prisma: PrismaService) {}

  async one(id: number): Promise<Contact> {
    const where: Prisma.ContactWhereUniqueInput = { id };
    const contact = await this.prisma.contact.findUnique({
      where,
    });
    if (!contact) throw new NotFoundException('Contato não encontrado');
    return contact;
  }

  async many(params: {
    cursor?: Prisma.ContactWhereUniqueInput;
    where?: Prisma.ContactWhereInput;
    orderBy?: Prisma.ContactOrderByWithRelationInput;
  }): Promise<Contact[]> {
    const { cursor, where, orderBy } = params;
    const contacts = await this.prisma.contact.findMany({
      cursor,
      where,
      orderBy,
    });
    return contacts;
  }

  async create(data: Prisma.ContactCreateInput): Promise<Contact> {
    const createdContact = await this.prisma.contact
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

  async update(id: number, data: Prisma.ContactUpdateInput): Promise<Contact> {
    const updatedContact = await this.prisma.contact
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
          if (e.code === 'P2025') {
            throw new BadRequestException('Contato não encontrado');
          }
        }
        throw e;
      });
    if (!updatedContact)
      throw new BadRequestException('Erro ao atualizar contato');

    return updatedContact;
  }

  async delete(id: number): Promise<Contact> {
    const deletedContact = await this.prisma.contact
      .delete({
        where: { id },
      })
      .catch((e) => {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
          if (e.code === 'P2025') {
            throw new BadRequestException('Contato não encontrado');
          }
        }
        throw e;
      });
    if (!deletedContact)
      throw new BadRequestException('Erro ao deletar contato');

    return deletedContact;
  }
}
