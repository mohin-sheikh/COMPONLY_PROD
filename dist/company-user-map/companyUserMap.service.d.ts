import { Repository } from 'typeorm';
import CompanyUserMap from './entities/companyUserMap';
export declare class CompanyUserMapService {
    private companyUserRepository;
    constructor(companyUserRepository: Repository<CompanyUserMap>);
    create(admin_id: number, company_id: number): Promise<CompanyUserMap>;
}
