import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { updateCompanyDto } from './dto/update-company.dto';
import { IsPublic } from '../auth/decorators/is-public.decorator';
import { ParseIdPipe } from '../products/pipes/parse-id.pipe';

@IsPublic()
@Controller('companies')
export class CompaniesController {
  constructor(private readonly service: CompaniesService) {}

  @Post()
  create(@Body() dto: CreateCompanyDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIdPipe) id: number) {
    return this.service.findOne(id);
  }

  @Get('search/:name')
  searchByName(@Param('name') name: string) {
    return this.service.findByName(name);
  }

  @Patch(':id')
  update(@Param('id', ParseIdPipe) id: number, @Body() dto: updateCompanyDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIdPipe) id: number) {
    return this.service.remove(id);
  }

  @Get(':id/products')
  getProducts(@Param('id', ParseIdPipe) id: number, @Query('name') name?: string) {
    return this.service.getProducts(id, name);
  }
}
