import { Controller, Post } from '@nestjs/common';
import { SocialsService } from '@socials/socials.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Social Authentication')
@Controller('socials')
export class SocialsController {
  constructor(private readonly _socialsService: SocialsService) {}

  @Post('sigin/facebook')
  public async signInWithFacebook(){
    return await this._socialsService.signInWithFacebook();
  }
}
