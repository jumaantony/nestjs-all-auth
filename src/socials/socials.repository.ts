import { SupabaseService } from "@/supabase/supabase.service";
import { Injectable } from "@nestjs/common";
import { SupabaseClient } from "@supabase/supabase-js";

@Injectable()
export class SocialRepository {
	public _supabaseClient: SupabaseClient;

	constructor(private _supabaseClientFactory: SupabaseService) {
	  this._supabaseClient = _supabaseClientFactory.createClient();
	}

	public async signInWithFacebook(){
		const { data, error } = await this._supabaseClient.auth.signInWithOAuth({
			provider: 'facebook'
		});
		return data;
	}
}