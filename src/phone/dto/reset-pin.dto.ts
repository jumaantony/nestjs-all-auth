import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumberString,
  IsPhoneNumber,
  IsNotEmpty,
  Length,
} from 'class-validator';

const VALID_OTP_LENGTH = 6;

export class ResetPinDto {
  @ApiProperty({
    description: 'A valid phone number',
    example: '+254742491942',
  })
  @IsPhoneNumber()
  @IsNotEmpty()
  readonly phoneNumber: string;

  @ApiProperty({
    description: "The 6-digit code sent to the user's phone number",
    example: '123456',
  })
  @IsNumberString()
  @IsNotEmpty()
  @Length(VALID_OTP_LENGTH, VALID_OTP_LENGTH, {
    message: `otp must be ${VALID_OTP_LENGTH} characters long`,
  })
  readonly otp: string;

  @ApiProperty({
    description: 'The new password for the user',
    example: '1234',
  })
  @IsNumberString()
  @IsNotEmpty()
  readonly PIN: string;
}
