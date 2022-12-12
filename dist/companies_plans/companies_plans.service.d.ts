import Companies_plans from 'src/companies_plans/entities/companies_plan.entity';
import { Repository } from 'typeorm';
export declare class CompaniesPlansService {
    private companiesPlansRepository;
    constructor(companiesPlansRepository: Repository<Companies_plans>);
    create(company_id: number, plan_id: number, user_id: number): Promise<Companies_plans>;
}
