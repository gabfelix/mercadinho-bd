import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from '@prisma/client';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';
import { FileInterceptor } from '@nestjs/platform-express';

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

  @Post(':id/set-image')
  @UseInterceptors(FileInterceptor('file'))
  async setImage(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.productService.setImage(id, file);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<Product> {
    return this.productService.delete(id);
  }
}
