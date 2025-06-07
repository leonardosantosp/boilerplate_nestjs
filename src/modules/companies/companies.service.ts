import { PrismaService } from '@database/PrismaService';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { updateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class CompaniesService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateCompanyDto) {
    return this.prisma.company.create({ data });
  }

  findAll() {
    return this.prisma.company.findMany();
  }

  async findOne(id: number) {
    const company = await this.prisma.company.findUnique({ where: { id: Number(id) } });
    if (!company) throw new NotFoundException('Company not found');
    return company;
  }

  async update(id: number, data: updateCompanyDto) {
    await this.findOne(id);
    return this.prisma.company.update({ where: { id: Number(id) }, data });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.company.delete({ where: { id: Number(id) } });
  }
}
