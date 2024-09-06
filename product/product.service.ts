import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class ProductService {
  private prisma = new PrismaClient();

  async create(data: { name: string; description: string; stock: number; price: number; supplierId: number }) {
    return this.prisma.product.create({ data });
  }

  async findAll() {
    return this.prisma.product.findMany();
  }

  async findOne(id: number) {
    return this.prisma.product.findUnique({ where: { id } });
  }

  async update(id: number, data: { name: string; description: string; stock: number; price: number; supplierId: number }) {
    return this.prisma.product.update({ where: { id }, data });
  }

  async remove(id: number) {
    return this.prisma.product.delete({ where: { id } });
  }
}