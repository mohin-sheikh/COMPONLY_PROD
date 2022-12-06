import { HttpStatus } from '@nestjs/common';
import { CompaniesPlansService } from './companies_plans.service';
import CreateCompaniesPlanDto from './dto/create-companies_plan.dto';
export declare class CompaniesPlansController {
    private readonly companiesPlansService;
    private readonly logger;
    constructor(companiesPlansService: CompaniesPlansService);
    create(request: any, createCompanyDto: CreateCompaniesPlanDto): Promise<{
        status: HttpStatus;
        message: string;
        response: {
            id: number;
            company_id: number;
            plan_id: number;
            admin_id: number;
            status: string;
        };
        error?: undefined;
    } | {
        status: HttpStatus;
        error: any;
        response: {
            id?: undefined;
            company_id?: undefined;
            plan_id?: undefined;
            admin_id?: undefined;
            status?: undefined;
        };
        message?: undefined;
    }>;
}
