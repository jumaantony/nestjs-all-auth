import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { EmailService } from '@email/email.service';
import { UserSignUpResponse } from '@/common/types/auth.types';
import { EmailCredentialsDto } from '@email/dto/email-auth-credentials.dto';
import { EmailSignInResponse, EmailSignUpResponse } from '@email/email-response-examples';
import { EmailDto } from '@/email/dto/email.dto';

@ApiTags('Email Authentication')
@Controller('email')
export class EmailController {
	constructor(private readonly _emailService: EmailService) { }

	@Post('signup')
	@ApiOperation({ summary: 'Sign up with email' })
	@ApiBody({ type: EmailCredentialsDto })
	@ApiResponse({
		description: 'The user has been successfully created.',
		type: EmailSignUpResponse,
	})
	async emailSignUp(
		@Body() body: any
		): Promise<UserSignUpResponse> {
		const { email, password } = body;
		const response = await this._emailService.emailSignUp(
			email,
			password
		);
		return response;
	};

	@Post('signin')
	@ApiOperation({ summary: 'Sign in with email' })
	@ApiBody({ type: EmailCredentialsDto })
	@ApiResponse({
		description: 'The user has been successfully created.',
		type: EmailSignInResponse,
	})
	async emailSignIn(@Body() body: any): Promise<any> {
		const { email, password } = body;
		const response = await this._emailService.emailSignIn(
			email,
			password
		);
		return response;
	};

	@Post('reset-password')
	@ApiOperation({ summary: 'Reset password with email' })
	@ApiBody({ type: EmailDto })
	@ApiResponse({
		description: 'The user has been successfully created.',
		// type: EmailSignInResponse,
	})
	async emailResetPassword(@Body() body: any): Promise<any> {
		const { email } = body;
		const response = await this._emailService.emailResetPassword(
			email
		);
		return response;
	};
}
