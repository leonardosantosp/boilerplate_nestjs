import { ApiProperty } from '@nestjs/swagger';

export class ResponseProductDto {
  @ApiProperty({ example: 2 })
  id: number;

  @ApiProperty({ example: 'air jordan' })
  name: string;

  @ApiProperty({ example: 455.99 })
  price: number;

  @ApiProperty({
    example:
      'Air force, Dunk, Air Max — A Tecnologia Que Você Precisa Para Melhorar Seus Resultados No Esporte. Compre Agora!',
  })
  description: string;

  @ApiProperty({ example: 4 })
  companyId: number;

  @ApiProperty({ example: '2025-06-08T01:09:32.541Z' })
  createdAt: Date;
}
