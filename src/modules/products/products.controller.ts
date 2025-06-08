import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { IsPublic } from '../auth/decorators/is-public.decorator';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ResponseProductDto } from './dto/response-product.dto';
import { ParseIdPipe } from '../../pipes/parse-id.pipe';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@Controller('products')
export class ProductsController {
  constructor(private readonly service: ProductsService) {}

  @IsPublic()
  @Post()
  @ApiTags('Products')
  @ApiOperation({ summary: 'Cria um novo produto.' })
  @ApiOkResponse({
    status: 201,
    description: 'Produto criado com sucesso.',
    type: ResponseProductDto,
  })
  @ApiBadRequestResponse({ description: 'Dados inválidos.' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno no servidor.' })
  create(@Body() data: CreateProductDto) {
    return this.service.create(data);
  }

  @IsPublic()
  @Get()
  @ApiTags('Products')
  @ApiOperation({ summary: 'Retorna todos os Produtos' })
  @ApiOkResponse({
    status: 200,
    type: ResponseProductDto,
  })
  @ApiInternalServerErrorResponse({ description: 'Erro interno no servidor.' })
  findAll() {
    return this.service.findall();
  }

  @IsPublic()
  @Get(':id')
  @ApiTags('Products')
  @ApiOperation({ summary: 'Retorna o produto pelo Id' })
  @ApiOkResponse({
    status: 200,
    type: ResponseProductDto,
  })
  @ApiNotFoundResponse({ description: 'Produto não encontrado' })
  @ApiBadRequestResponse({ description: 'Dados inválidos.' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno no servidor.' })
  findOne(@Param('id', ParseIdPipe) id: number) {
    return this.service.findOne(id);
  }

  @IsPublic()
  @Patch(':id')
  @ApiTags('Products')
  @ApiOperation({ summary: 'Atualiza um produto' })
  @ApiOkResponse({
    status: 200,
    type: ResponseProductDto,
  })
  @ApiNotFoundResponse({ description: 'Produto não encontrado' })
  @ApiBadRequestResponse({ description: 'Dados inválidos.' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno no servidor.' })
  update(@Param('id', ParseIdPipe) id: number, @Body() data: UpdateProductDto) {
    return this.service.update(id, data);
  }

  @IsPublic()
  @Delete(':id')
  @ApiTags('Products')
  @ApiOperation({ summary: 'Deleta um produto' })
  @ApiOkResponse({
    status: 200,
    type: ResponseProductDto,
  })
  @ApiNotFoundResponse({ description: 'Produto não encontrado' })
  @ApiBadRequestResponse({ description: 'Dados inválidos.' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno no servidor.' })
  remove(@Param('id', ParseIdPipe) id: number) {
    return this.service.remove(id);
  }
}
