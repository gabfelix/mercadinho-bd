import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsNumber()
  @Min(0.01)
  @IsNotEmpty()
  readonly amountInStock: number;

  @IsNumber()
  @Min(0.01)
  @IsNotEmpty()
  readonly suggestedPrice: number;

  @IsNumber()
  @IsNotEmpty()
  readonly providerId: number;

  @IsArray()
  @Type(() => String)
  @IsOptional()
  readonly categories: string[];
}

export class UpdateProductDto {
  @IsString()
  @IsOptional()
  readonly name: string;

  @IsNumber()
  @Min(0.01)
  @IsOptional()
  readonly amountInStock: number;

  @IsNumber()
  @Min(0.01)
  @IsOptional()
  readonly suggestedPrice: number;

  @IsNumber()
  @IsOptional()
  readonly providerId: number;

  @IsArray()
  @Type(() => String)
  @IsOptional()
  readonly categories: string[];
}
