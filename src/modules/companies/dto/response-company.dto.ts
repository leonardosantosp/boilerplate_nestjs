import { ApiProperty } from '@nestjs/swagger';

export class ResponsibleDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  document: string;

  @ApiProperty()
  phone: string;
}

export class ResponseCompanyDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  cnpj: string;

  @ApiProperty()
  responsibleId: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty({ type: () => ResponsibleDto })
  responsible: ResponsibleDto;
}
