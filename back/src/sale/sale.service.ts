import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';

@Injectable()
export class SaleService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createSaleDto: CreateSaleDto) {
    return await this.prisma.$transaction(async (tx) => {
      const sale = await tx.sale.create({
        data: {
          date: new Date(),
          customer: {
            connect: {
              id: createSaleDto.customerId,
            },
          },
        },
      });

      await Promise.all(
        createSaleDto.productData.map(async (product) => {
          // Use suggested price if no price is provided
          if (!product.price) {
            const storedProduct = await tx.product.findUnique({
              where: { id: product.id },
            });
            product.price = storedProduct.suggestedPrice;
          }

          await tx.saleProduct.create({
            data: {
              sale: { connect: { id: sale.id } },
              product: { connect: { id: product.id } },
              amount: product.quantity,
              price: product.price,
            },
          });

          const updatedProduct = await tx.product.update({
            where: { id: product.id },
            data: {
              amountInStock: {
                decrement: product.quantity,
              },
            },
          });

          if (updatedProduct.amountInStock < 0) {
            throw new Error(
              `Produto "${updatedProduct.name}" sem estoque suficiente`,
            );
          }
        }),
      );
    });
  }

  async findAll() {
    return await this.prisma.$queryRaw`SELECT * FROM SaleSummary`;
  }

  async low() {
    return await this.prisma.$queryRaw`SELECT * FROM HighValueLowStockProducts`;
  }
}
