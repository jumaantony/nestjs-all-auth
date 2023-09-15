import { Injectable } from '@nestjs/common';
import { EmailRepository } from '@email/email.repository';
import { UserSignUpResponse } from '@/common/types/auth.types';

@Injectable()
export class EmailService {
	constructor(private readonly _emailRepository: EmailRepository) { }

	async emailSignUp(
		email: string,
		password: string
	): Promise<UserSignUpResponse> {
		const response = await this._emailRepository.emailSignup(
			email,
			password
		);
		return response;
	};

	async emailSignIn(
		email: string,
		password: string
	): Promise<any> {
		const response = await this._emailRepository.emailSignIn(
			email,
			password
		);
		return response;
	};

	async emailResetPassword(
		email: string
	): Promise<any> {
		const response = await this._emailRepository.emailResetPassword(
			email
		);
		return response;
	}
}
