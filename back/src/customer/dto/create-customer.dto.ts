import { IsString } from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  name: string;

  @IsString()
  address: string;

  @IsString()
  cpf: string;
}
