import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { PrismaService } from '@database/PrismaService';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateProductDto) {
    return this.prisma.product.create({ data });
  }

  findall() {
    return this.prisma.product.findMany();
  }

  async findaOne(id: number) {
    const product = await this.prisma.product.findUnique({ where: { id: Number(id) } });
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async update(id: number, data: UpdateProductDto) {
    await this.findaOne(id);
    return this.prisma.product.update({ where: { id: Number(id) }, data });
  }

  async remove(id: number) {
    await this.findaOne(id);
    return this.prisma.product.delete({ where: { id: Number(id) } });
  }
}
