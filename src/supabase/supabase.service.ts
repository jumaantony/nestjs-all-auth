import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient } from '@supabase/supabase-js';
import { Database } from '@supabase-module/supabase.types';

@Injectable()
export class SupabaseService {
  private readonly url: string;
  private readonly anonApiKey: string;

  constructor(private readonly _config: ConfigService) {
    this.url = this._config.get('supabase.url');
    this.anonApiKey = this._config.get('supabase.anonApiKey');
  }

  public createClient() {
    const supabaseClient = createClient<Database>(this.url, this.anonApiKey, {
      auth: {
        persistSession: true,
      },
    });
    return supabaseClient;
  }
}
