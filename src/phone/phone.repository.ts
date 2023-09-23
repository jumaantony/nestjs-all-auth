import { SupabaseService } from '@supabase-module/supabase.service';
import { Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { BaseException } from '@common/exceptions/base.exception';
import {
  PinResetResponse,
  UserSignInResponse,
  UserSignUpResponse,
  updatePhoneNumberResponse,
} from '@common/types/auth.types';

@Injectable()
export class PhoneRepository {
  private _supabase: SupabaseClient;

  constructor(private readonly _supabaseClientFactory: SupabaseService) {
    this._supabase = this._supabaseClientFactory.createClient();
  }

  public async phoneNumberSignUp(
    phoneNumber: string,
    password: string,
  ): Promise<UserSignUpResponse> {
    const { data, error } = await this._supabase.auth.signUp({
      phone: phoneNumber,
      password: password,
    });
    if (error) {
      throw new BaseException(error.message, error.status);
    }
    return data;
  }

  public async phoneNumberVerifyOtp(
    phoneNumber: string,
    otp: string,
  ): Promise<UserSignInResponse> {
    const { data, error } = await this._supabase.auth.verifyOtp({
      phone: phoneNumber,
      token: otp,
      type: 'sms',
    });
    if (error) {
      throw new BaseException(error.message, error.status);
    }
    return data;
  }

  public async phoneNumberSignIn(
    phoneNumber: string,
    password: string,
  ): Promise<UserSignInResponse> {
    const { data, error } = await this._supabase.auth.signInWithPassword({
      phone: phoneNumber,
      password: password,
    });
    if (error) {
      throw new BaseException(error.message, error.status);
    }
    return data;
  }

  public async resendOtp(phoneNumber: string): Promise<UserSignInResponse> {
    const { data, error } = await this._supabase.auth.signInWithOtp({
      phone: phoneNumber,
    });
    if (error) {
      throw new BaseException(error.message, error.status);
    }
    return data;
  }

  public async resetPin(
    phoneNumber: string,
    otp: string,
    PIN: string,
  ): Promise<PinResetResponse> {
    const { error } = await this._supabase.auth.verifyOtp({
      phone: phoneNumber,
      token: otp,
      type: 'sms',
    });
    if (error) {
      throw new BaseException(error.message, error.status);
    }
    const { data: resetData, error: resetError } =
      await this._supabase.auth.updateUser({
        password: PIN,
      });
    if (resetError) {
      throw new BaseException(error.message, error.status);
    }
    return resetData;
  }

  public async changePhoneNumber(
    phoneNumber: string,
  ): Promise<updatePhoneNumberResponse> {
    const { data, error: changePhoneNumberError } =
      await this._supabase.auth.updateUser({ phone: phoneNumber });

    if (changePhoneNumberError) {
      throw new BaseException(
        changePhoneNumberError.message,
        changePhoneNumberError.status,
      );
    }

    // return this.resendOtp(phoneNumber);

    // const { data, error } = await this._supabase.auth.signInWithOtp({
    //   phone: phoneNumber,
    // });
    // if (error) {
    //   throw new BaseException(error.message, error.status);
    // }
    return data;
  }
}
