import { IsDateString, IsNumber } from 'class-validator';

export class CreateSaleDto {
  @IsDateString()
  date: string;
  // @IsNumber()
  // customerId: number;
}
