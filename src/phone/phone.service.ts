import { padPassword } from '@common/helpers/auth.helpers';
import { Injectable } from '@nestjs/common';
import { PhoneRepository } from '@phone/phone.repository';
import { PinResetResponse, UserSignUpResponse } from '@common/types/auth.types';

@Injectable()
export class PhoneService {
  constructor(private readonly _phoneRepository: PhoneRepository) {}

  async phoneNumberSignUp(
    phoneNumber: string,
    password: string,
  ): Promise<UserSignUpResponse> {
    password = padPassword(password);
    const response = await this._phoneRepository.phoneNumberSignUp(
      phoneNumber,
      password,
    );
    return response;
  }

  async phoneNumberVerifyOtp(
    phoneNumber: string,
    otp: string,
  ): Promise<UserSignUpResponse> {
    const response = await this._phoneRepository.phoneNumberVerifyOtp(
      phoneNumber,
      otp,
    );
    return response;
  }

  async phoneNumberSignIn(
    phoneNumber: string,
    password: string,
  ): Promise<UserSignUpResponse> {
    password = padPassword(password);
    const response = await this._phoneRepository.phoneNumberSignIn(
      phoneNumber,
      password,
    );
    return response;
  }

  async resendOtp(phoneNumber: string): Promise<UserSignUpResponse> {
    const response = await this._phoneRepository.resendOtp(phoneNumber);
    return response;
  }

  async resetPin(
    phoneNumber: string,
    otp: string,
    PIN: string,
  ): Promise<PinResetResponse> {
    const paddedPIN = padPassword(PIN);
    const response = await this._phoneRepository.resetPin(
      phoneNumber,
      otp,
      paddedPIN,
    );
    return response;
  }
}
