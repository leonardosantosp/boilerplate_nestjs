import { PrismaService } from '@database/PrismaService';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { updateCompanyDto } from './dto/update-company.dto';
import { getUser } from '../../utils/getUser';
import { companyWithResponsibleSelect } from './selects/company.select';

@Injectable()
export class CompaniesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateCompanyDto) {
    await getUser(this.prisma, data.responsibleId);
    try {
      return await this.prisma.company.create({
        data,
        include: companyWithResponsibleSelect,
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('CNPJ já cadastrado.');
      }
      throw error;
    }
  }

  findAll() {
    return this.prisma.company.findMany({
      include: companyWithResponsibleSelect,
    });
  }

  async findOne(id: number) {
    const company = await this.prisma.company.findUnique({
      where: { id },
      include: companyWithResponsibleSelect,
    });
    if (!company) throw new NotFoundException('Company not found');
    return company;
  }

  async findByName(name: string) {
    const company = await this.prisma.company.findMany({
      where: {
        name: {
          contains: name,
        },
      },
      include: companyWithResponsibleSelect,
    });

    if (company.length === 0) throw new NotFoundException('Company not found');
    return company;
  }

  async update(id: number, data: updateCompanyDto) {
    await this.findOne(id);
    return this.prisma.company.update({
      where: { id },
      data,
      include: companyWithResponsibleSelect,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    try {
      return await this.prisma.company.delete({
        where: { id },
        include: companyWithResponsibleSelect,
      });
    } catch (error) {
      if (error.code === 'P2003') {
        throw new BadRequestException(
          'Não é possível excluir a empresa porque existem produtos vinculados.',
        );
      }
      throw error;
    }
  }

  async getProducts(companyId: number, name?: string) {
    await this.findOne(companyId);
    return this.prisma.product.findMany({
      where: {
        companyId: companyId,
        ...(name && { name: { contains: name } }),
      },
    });
  }
}
