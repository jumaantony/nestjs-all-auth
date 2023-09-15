import { ApiProperty } from "@nestjs/swagger";
import {IsEmail, IsNotEmpty } from "class-validator";

const VALID_PASSWORD_LENGTH = 8;

export class EmailDto {
	@ApiProperty({
		description: 'A valid email address',
		example: 'example@email.com',
	})
	@IsEmail()
	@IsNotEmpty()
	readonly email: string;
}