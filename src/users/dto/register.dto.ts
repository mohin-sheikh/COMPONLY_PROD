import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import CreateCompanyDto from 'src/company/dto/create-company.dto';
import CreatePlanDto from 'src/plans/dto/create-plan.dto';
import CreateDto from './create.dto';

export class RegisterUserDto {
  @ApiProperty()
  @IsNotEmpty()
  user: CreateDto;

  @ApiProperty()
  @IsNotEmpty()
  company: CreateCompanyDto;

  @ApiProperty()
  @IsNotEmpty()
  plan: CreatePlanDto;
}
