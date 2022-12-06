import Companies_plans from 'src/companies_plans/entities/companies_plan.entity';
import { Repository } from 'typeorm';
import { CreateCompaniesPlanDto } from './dto/create-companies_plan.dto';
export declare class CompaniesPlansService {
    private companiesPlansRepository;
    constructor(companiesPlansRepository: Repository<Companies_plans>);
    create(createCompaniesPlanDto: CreateCompaniesPlanDto, user: any): Promise<Companies_plans>;
}
