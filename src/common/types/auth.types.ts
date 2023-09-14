import { User, Session } from '@supabase/supabase-js';

export interface UserSignUpResponse {
  user: User;
  session: Session | null;
}

export interface UserSignInResponse {
  user: User;
  session: Session;
}

export interface PinResetResponse {
  user: User;
}

export interface updatePhoneNumberResponse {
  user: User;
}
