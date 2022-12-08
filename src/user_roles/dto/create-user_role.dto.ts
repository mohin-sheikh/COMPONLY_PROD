import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateUserRoleDto {
  @ApiProperty()
  @IsNotEmpty()
  role_id: number;

  @ApiProperty()
  @IsNotEmpty()
  user_id: number;

  @ApiProperty()
  @IsNotEmpty()
  company_id: number;
}

export default CreateUserRoleDto;
