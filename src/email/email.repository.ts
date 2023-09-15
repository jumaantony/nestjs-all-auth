import { BaseException } from "@/common/exceptions/base.exception";
import { UserSignUpResponse } from "@/common/types/auth.types";
import { SupabaseService } from "@/supabase/supabase.service";
import { Injectable } from "@nestjs/common";
import { SupabaseClient } from "@supabase/supabase-js";

@Injectable()
export class EmailRepository {
	private _supabase: SupabaseClient;

	constructor(private readonly _supabaseClientFactory: SupabaseService) {
		this._supabase = this._supabaseClientFactory.createClient();
	}

	public async emailSignup(
		email: string,
		password: string
	): Promise<UserSignUpResponse> {
		const { data, error } = await this._supabase.auth.signUp({
			email: email,
			password: password,
		});
		if (error) {
			throw new BaseException(error.message, error.status);
		}
		return data;
	}

	public async emailSignIn(
		email: string,
		password: string
	): Promise<any> {
		const { data, error } = await this._supabase.auth.signInWithPassword({
			email: email,
			password: password,
		});
		if (error) {
			throw new BaseException(error.message, error.status);
		}
		return data;
	}

	public async emailResetPassword(
		email: string
	): Promise<any> {
		const { data, error } = await this._supabase.auth.resetPasswordForEmail(email);
		if (error) {
			throw new BaseException(error.message, error.status);
		}
		return data;
	}
}