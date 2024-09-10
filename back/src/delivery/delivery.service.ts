import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';

@Injectable()
export class DeliveryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createDeliveryDto: CreateDeliveryDto) {
    return await this.prisma.delivery.create({
      data: {
        ...createDeliveryDto,
        date: new Date(createDeliveryDto.date),
      },
    });
  }

  async findAll() {
    return await this.prisma.delivery.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.delivery.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateDeliveryDto: UpdateDeliveryDto) {
    return await this.prisma.delivery.update({
      where: { id },
      data: {
        ...updateDeliveryDto,
        date: new Date(updateDeliveryDto.date),
      },
    });
  }

  async remove(id: number) {
    return await this.prisma.delivery.delete({
      where: { id },
    });
  }
}
