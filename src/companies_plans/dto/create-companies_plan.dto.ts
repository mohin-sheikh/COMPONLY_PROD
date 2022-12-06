import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCompaniesPlanDto {
  @ApiProperty()
  @IsNotEmpty()
  company_id: number;

  @ApiProperty()
  plan_id: number;

  @ApiProperty()
  status: string;
}

export default CreateCompaniesPlanDto;
