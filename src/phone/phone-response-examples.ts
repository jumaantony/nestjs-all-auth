import { ApiProperty } from '@nestjs/swagger';
import {
  UserSignUpResponse,
  UserSignInResponse,
} from '@common/types/auth.types';
import { Session, User } from '@supabase/supabase-js';

export const userResponseExample = {
  id: '04763bdf-0d5b-4eb4-8208-71851054e162',
  aud: 'authenticated',
  role: 'authenticated',
  email: '',
  phone: '254742491942',
  phone_confirmed_at: '2023-05-24T08:54:33.622982134Z',
  confirmation_sent_at: '2023-05-24T08:53:42.159929Z',
  last_sign_in_at: '2023-05-24T08:54:33.623890065Z',
  app_metadata: {
    provider: 'phone',
    providers: ['phone'],
  },
  user_metadata: {},
  identities: [
    {
      id: '04763bdf-0d5b-4eb4-8208-71851054e162',
      user_id: '04763bdf-0d5b-4eb4-8208-71851054e162',
      identity_data: {
        sub: '04763bdf-0d5b-4eb4-8208-71851054e162',
      },
      provider: 'phone',
      last_sign_in_at: '2023-05-24T08:53:41.972681Z',
      created_at: '2023-05-24T08:53:41.972716Z',
      updated_at: '2023-05-24T08:53:41.972716Z',
    },
  ],
  created_at: '2023-05-24T08:53:41.96855Z',
  updated_at: '2023-05-24T08:54:33.628408Z',
};

export const sessionResponseExample = {
  access_token: 'avaliduseraccesstoken',
  token_type: 'bearer',
  expires_in: 604800,
  refresh_token: '4khtZLeGwzs9qdn0TVdosg',
  user: {
    id: '04763bdf-0d5b-4eb4-8208-71851054e162',
    aud: 'authenticated',
    role: 'authenticated',
    email: '',
    phone: '254742491942',
    phone_confirmed_at: '2023-05-24T08:54:33.622982134Z',
    confirmation_sent_at: '2023-05-24T08:53:42.159929Z',
    last_sign_in_at: '2023-05-24T08:54:33.623890065Z',
    app_metadata: {
      provider: 'phone',
      providers: ['phone'],
    },
    user_metadata: {},
    identities: [
      {
        id: '04763bdf-0d5b-4eb4-8208-71851054e162',
        user_id: '04763bdf-0d5b-4eb4-8208-71851054e162',
        identity_data: {
          sub: '04763bdf-0d5b-4eb4-8208-71851054e162',
        },
        provider: 'phone',
        last_sign_in_at: '2023-05-24T08:53:41.972681Z',
        created_at: '2023-05-24T08:53:41.972716Z',
        updated_at: '2023-05-24T08:53:41.972716Z',
      },
    ],
    created_at: '2023-05-24T08:53:41.96855Z',
    updated_at: '2023-05-24T08:54:33.628408Z',
  },
  expires_at: 1685523274,
};

export class PhoneSignUpResponse implements UserSignUpResponse {
  @ApiProperty({
    example: userResponseExample,
  })
  readonly user: User;

  @ApiProperty({
    example: null,
  })
  readonly session: Session | null;
}

export class PhoneSignInResponse implements UserSignInResponse {
  @ApiProperty({
    example: userResponseExample,
  })
  readonly user: User;

  @ApiProperty({
    example: userResponseExample,
  })
  readonly session: Session;
}

export class VerifyPhoneResponse implements UserSignInResponse {
  @ApiProperty({
    example: userResponseExample,
  })
  readonly user: User;

  @ApiProperty({
    example: sessionResponseExample,
  })
  readonly session: Session;
}

export class PhoneResendOtpResponse {
  @ApiProperty({
    example: userResponseExample,
  })
  readonly user: User | null;

  @ApiProperty({
    example: sessionResponseExample,
  })
  readonly session: Session | null;
}

export class PinResetResponse {
  @ApiProperty({
    example: userResponseExample,
  })
  readonly user: User;
}

export class changePhoneNumberResponse {
  @ApiProperty({
    example: userResponseExample,
  })
  readonly user: User;
  // session: Session;
}
