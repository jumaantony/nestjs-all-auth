import { Module } from '@nestjs/common';
import { MediaService } from '@media/media.service';
import { MediaController } from '@media/media.controller';
import { SupabaseService } from '@supabase-module/supabase.service';
import { MediaRepository } from '@media/media.repository';

@Module({
  controllers: [MediaController],
  providers: [MediaService, MediaRepository, SupabaseService],
})
export class MediaModule {}
