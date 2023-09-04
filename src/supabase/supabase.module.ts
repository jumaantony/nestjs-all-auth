import { Module } from '@nestjs/common';
import { SupabaseService } from '@supabase-module/supabase.service';

@Module({
  providers: [SupabaseService],
})
export class SupabaseModule {}
