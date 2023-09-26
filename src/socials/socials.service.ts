import { Injectable } from '@nestjs/common';
import { SocialRepository } from '@socials/socials.repository';

@Injectable()
export class SocialsService {
	  constructor(
		  private _socialRepository: SocialRepository
	  ) {}

	  public async signInWithFacebook(){
		  return await this._socialRepository.signInWithFacebook();
	  }
}
