import CreateCompanyDto from 'src/company/dto/create-company.dto';
import CreatePlanDto from 'src/plans/dto/create-plan.dto';
import CreateDto from './create.dto';
export declare class RegisterUserDto {
    user: CreateDto;
    company: CreateCompanyDto;
    plan: CreatePlanDto;
}
