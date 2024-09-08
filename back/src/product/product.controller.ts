import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from '@prisma/client';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async findAll(): Promise<Product[]> {
    return this.productService.many({});
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Product> {
    return this.productService.one(id);
  }

  @Post()
  async create(@Body() prismaCreateData: CreateProductDto): Promise<Product> {
    return this.productService.create(prismaCreateData);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() prismaUpdateData: UpdateProductDto,
  ): Promise<Product> {
    return this.productService.update(id, prismaUpdateData);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<Product> {
    return this.productService.delete(id);
  }
}
