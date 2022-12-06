import { Repository } from 'typeorm';
import CreateCompanyDto from './dto/create-company.dto';
import companies from './entities/company.entity';
export declare class CompanyService {
    private companyRepository;
    constructor(companyRepository: Repository<companies>);
    findByName(name: any): Promise<companies>;
    create(createCompanyDto: CreateCompanyDto, name: string): Promise<companies>;
}
