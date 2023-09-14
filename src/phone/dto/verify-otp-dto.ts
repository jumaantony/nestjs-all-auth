import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumberString,
  IsPhoneNumber,
  IsNotEmpty,
  Length,
} from 'class-validator';

const VALID_OTP_LENGTH = 6;

export class VerifyOtpDto {
  @ApiProperty({
    description: 'A valid phone number',
    example: '+254742491942',
  })
  @IsNotEmpty()
  @IsPhoneNumber()
  readonly phoneNumber: string;

  @ApiProperty({
    description: "The 6-digit code sent to user's phone number",
    example: '123456',
  })
  @IsNumberString()
  @IsNotEmpty()
  @Length(VALID_OTP_LENGTH, VALID_OTP_LENGTH, {
    message: `otp must be ${VALID_OTP_LENGTH} characters long`,
  })
  readonly otp: string;
}
