import { IsDateString, IsString } from 'class-validator';

export class CreateEmployeeDto {
  @IsDateString()
  readonly hireDate: string;

  @IsString()
  readonly job: string;

  @IsString()
  readonly name: string;
}
