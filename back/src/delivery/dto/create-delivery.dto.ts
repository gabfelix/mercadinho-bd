import { IsDateString, IsNumber, IsPositive } from 'class-validator';

export class CreateDeliveryDto {
  @IsNumber()
  @IsPositive()
  readonly quantity: number;

  @IsNumber()
  readonly productId: number;

  @IsNumber()
  readonly employeeId: number;

  @IsDateString()
  readonly date: string;
}
