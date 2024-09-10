import { IsArray, IsNumber } from 'class-validator';

export class CreateSaleDto {
  @IsNumber()
  customerId: number;

  @IsArray()
  productData: Array<{ id: number; quantity: number; price?: number }>;
}
