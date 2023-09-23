import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { first } from 'rxjs';

export class UpdateProfileDto {
  @ApiProperty({
    description: "user's first name",
    example: 'John',
  })
  @IsString()
  first_name?: string;

  @ApiProperty({
    description: "user's first name",
    example: 'Doe',
  })
  @IsString()
  last_name?: string;
}
