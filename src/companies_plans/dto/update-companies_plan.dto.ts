import { PartialType } from '@nestjs/swagger';
import { CreateCompaniesPlanDto } from './create-companies_plan.dto';

export class UpdateCompaniesPlanDto extends PartialType(CreateCompaniesPlanDto) {}
