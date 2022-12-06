import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResetPassDTO {
  @ApiProperty()
  @IsNotEmpty()
  currentPass: string;

  @ApiProperty()
  @IsNotEmpty()
  newPass: string;

  @ApiProperty()
  @IsNotEmpty()
  confirmPass: string;
}

export default ResetPassDTO;
