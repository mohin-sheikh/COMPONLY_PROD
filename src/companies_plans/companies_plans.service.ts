import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Companies_plans from 'src/companies_plans/entities/companies_plan.entity';
import { Repository } from 'typeorm';
import { CreateCompaniesPlanDto } from './dto/create-companies_plan.dto';

@Injectable()
export class CompaniesPlansService {
  constructor(
    @InjectRepository(Companies_plans)
    private companiesPlansRepository: Repository<Companies_plans>,
  ) {}

  async create(createCompaniesPlanDto: CreateCompaniesPlanDto, user: any) {
    const companiesPlan = this.companiesPlansRepository.create({
      company_id: createCompaniesPlanDto.company_id,
      plan_id: createCompaniesPlanDto.plan_id,
      status: createCompaniesPlanDto.status,
      admin_id: user.id,
      updated_by: user.id,
      bought_at: new Date(),
      created_at: new Date(),
      updated_at: new Date(),
    });
    await this.companiesPlansRepository.save(companiesPlan);
    return companiesPlan;
  }
}
