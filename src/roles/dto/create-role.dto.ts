import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  permissions: string;
}

export default CreateRoleDto;
