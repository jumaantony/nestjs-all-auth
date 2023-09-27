import { socialSignInResponse } from '@common/types/auth.types';
import { Injectable } from '@nestjs/common';
import { SocialRepository } from '@socials/socials.repository';

@Injectable()
export class SocialsService {
  constructor(private _socialRepository: SocialRepository) {}

  public async signUpWithFacebook(): Promise<socialSignInResponse> {
    return await this._socialRepository.signUpWithFacebook();
  }

  public async signUpWithGoogle(): Promise<socialSignInResponse> {
    return await this._socialRepository.signUpWithGoogle();
  }
}
