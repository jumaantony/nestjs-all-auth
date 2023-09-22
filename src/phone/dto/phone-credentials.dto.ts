import {
  IsPhoneNumber,
  IsNumberString,
  Length,
  IsNotEmpty,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

const VALID_PIN_LENGTH = 4;

export class phoneNumberDto {
  @ApiProperty({
    description: 'A valid phone number',
    example: '+254742491942',
  })
  @IsPhoneNumber()
  @IsNotEmpty()
  readonly phoneNumber: string;
}

export class AuthCredentialsDto extends phoneNumberDto {
  @ApiProperty({ description: 'A 4-digit numeric PIN', example: '1234' })
  @IsNumberString()
  @IsNotEmpty()
  @Length(VALID_PIN_LENGTH, VALID_PIN_LENGTH, {
    message: `PIN must be ${VALID_PIN_LENGTH} characters long`,
  })
  readonly PIN: string;
}
