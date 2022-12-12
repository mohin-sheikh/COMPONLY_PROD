import { ApiProperty } from '@nestjs/swagger';

export class UpdateDto {
  @ApiProperty()
  full_name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  alternate_email: string;

  @ApiProperty()
  profile: string;
}
