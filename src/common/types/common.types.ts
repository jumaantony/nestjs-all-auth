import { User } from '@supabase/supabase-js';

export interface ExtendedUser extends User {
  sub: string;
}
