import { IsString } from 'class-validator';

export class UpdateProfileDto {
  @IsString()
  first_name?: string;

  @IsString()
  last_name?: string;
}
