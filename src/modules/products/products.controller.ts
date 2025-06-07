import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { IsPublic } from '../auth/decorators/is-public.decorator';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@IsPublic()
@Controller('products')
export class ProductsController {
  constructor(private readonly service: ProductsService) {}

  @Post()
  create(@Body() data: CreateProductDto) {
    return this.service.create(data);
  }

  @Get()
  findAll() {
    return this.service.findall();
  }

  @Get(':id')
  findOnde(@Param('id') id: number) {
    return this.service.findaOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() data: UpdateProductDto) {
    return this.service.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.service.remove(id);
  }
}
