import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateCompanyDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @Length(14, 14, { message: 'cnpj must be 14 characters' })
  cnpj: string;
}
