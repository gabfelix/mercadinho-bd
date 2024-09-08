import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, Product } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async one(id: number): Promise<Product> {
    const where: Prisma.ProductWhereUniqueInput = { id };
    const product = await this.prisma.product.findUnique({ where });
    if (!product) throw new NotFoundException('Produto não encontrado');
    return product;
  }

  async many(params: {
    cursor?: Prisma.ProductWhereUniqueInput;
    where?: Prisma.ProductWhereInput;
    orderBy?: Prisma.ProductOrderByWithRelationInput;
  }): Promise<Product[]> {
    const { cursor, where, orderBy } = params;
    const products = await this.prisma.product.findMany({
      cursor,
      where,
      orderBy,
    });
    return products;
  }

  async create(data: CreateProductDto): Promise<Product> {
    // TODO: Categories
    const { name, amountInStock, suggestedPrice, providerId } = data;
    const createdProduct = await this.prisma.product
      .create({
        data: {
          name,
          amountInStock,
          suggestedPrice,
          providerId,
        },
      })
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
    if (!createdProduct) throw new BadRequestException('Erro ao criar produto');

    return createdProduct;
  }

  async update(id: number, data: UpdateProductDto): Promise<Product> {
    const { name, amountInStock, suggestedPrice, providerId } = data;
    const updatedProduct = await this.prisma.product
      .update({
        where: { id },
        data: {
          name,
          amountInStock,
          suggestedPrice,
          providerId,
        },
      })
      .catch((e) => {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
          if (e.code === 'P2002') {
            const target = e.meta?.target?.[0] ?? '';
            const field = target[0].toUpperCase() + target.slice(1);
            throw new BadRequestException(`${field} já está em uso`);
          }
          if (e.code === 'P2025') {
            throw new BadRequestException('Produto não encontrado');
          }
        }
        throw e;
      });
    if (!updatedProduct)
      throw new BadRequestException('Erro ao atualizar produto');

    return updatedProduct;
  }

  async delete(id: number): Promise<Product> {
    const deletedProduct = await this.prisma.product
      .delete({
        where: { id },
      })
      .catch((e) => {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
          if (e.code === 'P2025') {
            throw new BadRequestException('Produto não encontrado');
          }
        }
        throw e;
      });
    if (!deletedProduct)
      throw new BadRequestException('Erro ao deletar produto');

    return deletedProduct;
  }
}
