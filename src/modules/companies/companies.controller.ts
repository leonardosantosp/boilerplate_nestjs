import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { updateCompanyDto } from './dto/update-company.dto';
import { IsPublic } from '../auth/decorators/is-public.decorator';
import { ParseIdPipe } from '../../pipes/parse-id.pipe';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ResponseCompanyDto } from './dto/response-company.dto';
import { ResponseProductDto } from '../products/dto/response-product.dto';

@Controller('companies')
export class CompaniesController {
  constructor(private readonly service: CompaniesService) {}

  @IsPublic()
  @Post()
  @ApiTags('Companies')
  @ApiOperation({ summary: 'Cria uma nova empresa' })
  @ApiOkResponse({
    status: 201,
    description: 'Empresa criada com sucesso.',
    type: ResponseCompanyDto,
  })
  @ApiBadRequestResponse({ description: 'Dados inválidos.' })
  @ApiConflictResponse({ description: 'Empresa já existe.' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno no servidor.' })
  create(@Body() dto: CreateCompanyDto) {
    return this.service.create(dto);
  }

  @IsPublic()
  @Get()
  @ApiTags('Companies')
  @ApiOperation({ summary: 'Retorna todas as empresas' })
  @ApiOkResponse({
    status: 200,
    type: ResponseCompanyDto,
  })
  @ApiBadRequestResponse({ description: 'Dados inválidos.' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno no servidor.' })
  findAll() {
    return this.service.findAll();
  }

  @IsPublic()
  @Get(':id')
  @ApiTags('Companies')
  @ApiOperation({ summary: 'Retorna uma empresa pelo Id' })
  @ApiOkResponse({
    status: 200,
    type: ResponseCompanyDto,
  })
  @ApiNotFoundResponse({ description: 'Empresa não encontrada' })
  @ApiBadRequestResponse({ description: 'Dados inválidos.' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno no servidor.' })
  findOne(@Param('id', ParseIdPipe) id: number) {
    return this.service.findOne(id);
  }

  @IsPublic()
  @Get('search/:name')
  @ApiTags('Companies')
  @ApiOperation({ summary: 'Retorna uma empresa pelo nome' })
  @ApiOkResponse({
    status: 200,
    type: ResponseCompanyDto,
  })
  @ApiNotFoundResponse({ description: 'Empresa não encontrada' })
  @ApiBadRequestResponse({ description: 'Dados inválidos.' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno no servidor.' })
  searchByName(@Param('name') name: string) {
    return this.service.findByName(name);
  }

  @IsPublic()
  @Patch(':id')
  @ApiTags('Companies')
  @ApiOperation({ summary: 'Atualiza uma empresa' })
  @ApiOkResponse({
    status: 200,
    type: ResponseCompanyDto,
  })
  @ApiNotFoundResponse({ description: 'Empresa não encontrada' })
  @ApiConflictResponse({ description: 'Empresa já existe.' })
  @ApiBadRequestResponse({ description: 'Dados inválidos.' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno no servidor.' })
  update(@Param('id', ParseIdPipe) id: number, @Body() dto: updateCompanyDto) {
    return this.service.update(id, dto);
  }

  @IsPublic()
  @Delete(':id')
  @ApiTags('Companies')
  @ApiOperation({ summary: 'Deleta uma empresa' })
  @ApiOkResponse({
    status: 200,
    type: ResponseCompanyDto,
  })
  @ApiBadRequestResponse({ description: 'Dados inválidos.' })
  @ApiNotFoundResponse({ description: 'Empresa não encontrada' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno no servidor.' })
  remove(@Param('id', ParseIdPipe) id: number) {
    return this.service.remove(id);
  }

  @IsPublic()
  @Get(':id/products')
  @ApiTags('Companies')
  @ApiOperation({ summary: 'Retorna os produtos de uma determinada empresa' })
  @ApiOkResponse({
    status: 200,
    type: ResponseProductDto,
  })
  @ApiNotFoundResponse({ description: 'Empresa não encontrada' })
  @ApiBadRequestResponse({ description: 'Dados inválidos.' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno no servidor.' })
  getProducts(@Param('id', ParseIdPipe) id: number, @Query('name') name?: string) {
    return this.service.getProducts(id, name);
  }
}
