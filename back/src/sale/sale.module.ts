import { Module } from '@nestjs/common';
import { SaleController } from './sale.controller';

@Module({
  controllers: [SaleController]
})
export class SaleModule {}
