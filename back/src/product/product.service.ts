import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, Product } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  private readonly logger = new Logger();

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
    const { name, amountInStock, suggestedPrice, providerId, categories } =
      data;

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

    if (!categories) return;
    // Connect categories (create if not existing)
    const existingCategories = await this.prisma.category.findMany({
      where: { name: { in: categories } },
    });

    // const unrelatedExistingCategories = this.prisma.productCategory.findMany({
    //   where: {
    //     productId: { not: id },
    //     categoryId: { in: existingCategories.map((c) => c.id) },
    //   },
    // });
    // By definition, new categories are unrelated
    const newCategories = categories.filter(
      (c) => !existingCategories.map((c) => c.name).includes(c),
    );
    await Promise.all(
      newCategories.map(async (name) => {
        await this.prisma.category.create({
          data: { name },
        });
      }),
    );
    const categoriesToConnect = await this.prisma.category.findMany({
      where: { name: { in: categories } },
    });
    // Try to connect all categories. Ignore if already connected and keep going
    for (const category of categoriesToConnect) {
      try {
        await this.prisma.productCategory.create({
          data: {
            categoryId: category.id,
            productId: id,
          },
        });
      } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
          if (e.code === 'P2002') {
            this.logger.warn(
              `Error connecting category to product: ${e.message}. Ignoring`,
            );
            continue;
          } else {
            throw e;
          }
        }
      }
    }
    const categoriesToDisconnect = await this.prisma.productCategory.findMany({
      where: {
        productId: id,
        categoryId: { notIn: categoriesToConnect.map((c) => c.id) },
      },
    });
    await this.prisma.productCategory.deleteMany({
      where: {
        productId: id,
        categoryId: { in: categoriesToDisconnect.map((c) => c.categoryId) },
      },
    });

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

  async setImage(id: number, file: Express.Multer.File) {
    this.logger.log(`received file has size: ${file.size}`);
    return await this.prisma.product.update({
      where: { id },
      data: { image: file.buffer },
    });
  }
}
