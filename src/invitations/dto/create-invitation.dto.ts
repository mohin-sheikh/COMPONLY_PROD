import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateInvitationDto {
  @ApiProperty()
  @IsNotEmpty()
  admin_id: number;

  @ApiProperty()
  role_id: number;

  @ApiProperty()
  company_id: number;

  @ApiProperty()
  email: string;
}

export default CreateInvitationDto;
