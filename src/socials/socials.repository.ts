import { BaseException } from '@common/exceptions/base.exception';
import { socialSignInResponse } from '@common/types/auth.types';
import { SupabaseService } from '@supabase-module/supabase.service';
import { Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SocialRepository {
  public _supabaseClient: SupabaseClient;

  constructor(private _supabaseClientFactory: SupabaseService) {
    this._supabaseClient = _supabaseClientFactory.createClient();
  }

  public async signUpWithFacebook(): Promise<socialSignInResponse> {
    const { data, error } = await this._supabaseClient.auth.signInWithOAuth({
      provider: 'facebook',
    });

    if (error) {
      throw new BaseException(error.message);
    }
    return data;
  }

  public async signUpWithGoogle(): Promise<socialSignInResponse> {
    const { data, error } = await this._supabaseClient.auth.signInWithOAuth({
      provider: 'google',
    });

    if (error) {
      throw new BaseException(error.message);
    }
    return data;
  }
}
