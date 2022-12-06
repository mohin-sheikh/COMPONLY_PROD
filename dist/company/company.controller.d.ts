import { HttpStatus } from '@nestjs/common';
import { CompanyService } from './company.service';
import CreateCompanyDto from './dto/create-company.dto';
export declare class CompanyController {
    private readonly companyService;
    private readonly logger;
    constructor(companyService: CompanyService);
    create(request: any, createCompanyDto: CreateCompanyDto): Promise<{
        status: HttpStatus;
        message: string;
        response: {
            id?: undefined;
            name?: undefined;
            logo?: undefined;
            seats?: undefined;
        };
        error?: undefined;
    } | {
        status: HttpStatus;
        message: string;
        response: {
            id: number;
            name: string;
            logo: string;
            seats: number;
        };
        error?: undefined;
    } | {
        status: HttpStatus;
        error: any;
        response: {
            id?: undefined;
            name?: undefined;
            logo?: undefined;
            seats?: undefined;
        };
        message?: undefined;
    }>;
}
