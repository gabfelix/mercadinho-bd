import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SaleService } from './sale.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';

@Controller('sale')
export class SaleController {
  constructor(private readonly saleService: SaleService) {}

  @Post()
  async create(@Body() createSaleDto: CreateSaleDto) {
    return await this.saleService.create(createSaleDto);
  }

  @Get()
  async findAll() {
    return await this.saleService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.saleService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateSaleDto: UpdateSaleDto) {
    return await this.saleService.update(+id, updateSaleDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.saleService.remove(+id);
  }
}
