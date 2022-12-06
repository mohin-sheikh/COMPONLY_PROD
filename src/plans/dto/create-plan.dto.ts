import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreatePlanDto {
  @ApiProperty()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  subtitle: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  period: string;

  @ApiProperty()
  features: string;
}

export default CreatePlanDto;
