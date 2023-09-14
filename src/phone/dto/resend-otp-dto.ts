import { IsNotEmpty, IsPhoneNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResendOtpDto {
  @ApiProperty({
    description: 'A valid phone number',
    example: '+254742491942',
  })
  @IsNotEmpty()
  @IsPhoneNumber()
  readonly phoneNumber: string;
}
