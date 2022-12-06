import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ForgotPasswordVerifyDTO {
  @ApiProperty()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly otp: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly newPassword: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly confirmPassword: string;
}
