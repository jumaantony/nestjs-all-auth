import { Module } from '@nestjs/common';
import { SocialsService } from '@socials/socials.service';
import { SocialsController } from '@socials/socials.controller';
import { SupabaseService } from '@supabase-module/supabase.service';
import { SocialRepository } from '@socials/socials.repository';

@Module({
  controllers: [SocialsController],
  providers: [SocialsService, SupabaseService, SocialRepository],
})
export class SocialsModule {}
