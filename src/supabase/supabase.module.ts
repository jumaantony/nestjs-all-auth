import { Logger, Module } from '@nestjs/common';
import { SupabaseService } from '@supabase-module/supabase.service';
import { supabaseProviders } from '@supabase-module/supabase.providers';

@Module({
  providers: [SupabaseService, ...supabaseProviders, Logger],
  exports: [SupabaseService, ...supabaseProviders],
})
export class SupabaseModule {}
