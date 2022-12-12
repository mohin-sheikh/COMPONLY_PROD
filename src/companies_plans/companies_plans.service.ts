import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Companies_plans from 'src/companies_plans/entities/companies_plan.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CompaniesPlansService {
  constructor(
    @InjectRepository(Companies_plans)
    private companiesPlansRepository: Repository<Companies_plans>,
  ) {}

  async create(company_id: number, plan_id: number, user_id: number) {
    const companiesPlan = this.companiesPlansRepository.create({
      company_id: company_id,
      plan_id: plan_id,
      admin_id: user_id,
      updated_by: user_id,
      bought_at: new Date(),
      created_at: new Date(),
      updated_at: new Date(),
    });
    return companiesPlan;
  }
}
