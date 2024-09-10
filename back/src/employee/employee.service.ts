import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class EmployeeService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createEmployeeDto: CreateEmployeeDto) {
    return await this.prismaService.employee.create({
      data: {
        ...createEmployeeDto,
        hireDate: new Date(createEmployeeDto.hireDate),
      },
    });
  }

  async findAll() {
    return await this.prismaService.employee.findMany();
  }

  async findOne(id: number) {
    return await this.prismaService.employee.findUnique({
      where: {
        id: id,
      },
    });
  }

  async update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    return await this.prismaService.employee.update({
      where: {
        id: id,
      },
      data: {
        ...updateEmployeeDto,
        hireDate: new Date(updateEmployeeDto.hireDate),
      },
    });
  }

  async remove(id: number) {
    return await this.prismaService.employee.delete({
      where: {
        id: id,
      },
    });
  }
}
