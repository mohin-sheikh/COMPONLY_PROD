import { ApiProperty } from '@nestjs/swagger';

export class UpdateDto {
  @ApiProperty()
  first_name: string;

  @ApiProperty()
  last_name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  alternate_email: string;

  @ApiProperty()
  profile: string;
}
