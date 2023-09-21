import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsStrongPassword } from 'class-validator';
import { EmailDto } from '@email/dto/email.dto';

const VALID_PASSWORD_LENGTH = 8;

export class EmailCredentialsDto extends EmailDto {
  @ApiProperty({ description: 'A valid password', example: 'Pass@w0rd' })
  @IsNotEmpty()
  @IsStrongPassword({
    minLength: VALID_PASSWORD_LENGTH,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  readonly password: string;
}
