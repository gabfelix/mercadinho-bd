import { Injectable } from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class SaleService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createSaleDto: CreateSaleDto) {
    const sale = await this.prismaService.sale.create({
      data: {
        ...createSaleDto,
        date: new Date(createSaleDto.date),
      },
    });

    return sale;
  }

  async findAll() {
    return `This action returns all sale`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} sale`;
  }

  async update(id: number, updateSaleDto: UpdateSaleDto) {
    return `This action updates a #${id} sale`;
  }

  async remove(id: number) {
    return `This action removes a #${id} sale`;
  }
}
