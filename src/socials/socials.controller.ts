import { Controller, Post } from '@nestjs/common';
import { SocialsService } from '@socials/socials.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { socialSignInResponse } from '@common/types/auth.types';
import { SocialSignInResponse } from '@socials/socials-response-examples';

@ApiTags('Social Authentication')
@Controller('socials')
export class SocialsController {
  constructor(private readonly _socialsService: SocialsService) {}

  @Post('signup/facebook')
  @ApiOperation({ summary: 'Sign up with facebook' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
    type: SocialSignInResponse,
  })
  public async signUpWithFacebook(): Promise<socialSignInResponse>{
    return await this._socialsService.signUpWithFacebook();
  }

  @Post('signup/google')
  @ApiOperation({ summary: 'Sign up with google' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
    type: SocialSignInResponse,
  })
  public async signUpWithGoogle(): Promise<socialSignInResponse>{
    return await this._socialsService.signUpWithGoogle();
  }
}
