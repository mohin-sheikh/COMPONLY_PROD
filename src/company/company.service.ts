import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import CreateCompanyDto from './dto/create-company.dto';
import companies from './entities/company.entity';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(companies)
    private companyRepository: Repository<companies>,
  ) {}

  async findByName(name: any) {
    return this.companyRepository
      .createQueryBuilder('companies')
      .where('companies.name = :name', { name: name })
      .andWhere('companies.is_deleted = :is_deleted', { is_deleted: false })
      .getOne();
  }

  async create(createCompanyDto: CreateCompanyDto, name: string) {
    const company = this.companyRepository.create({
      name: createCompanyDto.name,
      logo: createCompanyDto.logo,
      seats: createCompanyDto.seats,
      created_by: name,
      created_at: new Date(),
      updated_at: new Date(),
    });
    await this.companyRepository.save(company);
    return company;
  }
}
