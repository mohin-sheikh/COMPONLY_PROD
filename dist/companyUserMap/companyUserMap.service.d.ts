import { Repository } from 'typeorm';
import companyUserMap from './entities/companyUserMap';
export declare class CompanyUserMapService {
    private companyUserRepository;
    constructor(companyUserRepository: Repository<companyUserMap>);
    create(admin_id: number, company_id: number): Promise<companyUserMap>;
}
