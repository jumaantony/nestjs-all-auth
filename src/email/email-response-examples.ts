import {
  UserSignInResponse,
  UserSignUpResponse,
} from '@/common/types/auth.types';
import { ApiProperty } from '@nestjs/swagger';
import { User, Session } from '@supabase/supabase-js';

export const emailResponseExample = {
  id: '04763bdf-0d5b-4eb4-8208-71851054e162',
  aud: 'authenticated',
  role: 'authenticated',
  email: 'email@example.com',
  phone: '',
  phone_confirmed_at: '2023-05-24T08:54:33.622982134Z',
  confirmation_sent_at: '2023-05-24T08:53:42.159929Z',
  last_sign_in_at: '2023-05-24T08:54:33.623890065Z',
  app_metadata: {
    provider: 'email',
    providers: ['email'],
  },
  user_metadata: {},
  identities: [
    {
      id: '04763bdf-0d5b-4eb4-8208-71851054e162',
      user_id: '04763bdf-0d5b-4eb4-8208-71851054e162',
      identity_data: {
        sub: '04763bdf-0d5b-4eb4-8208-71851054e162',
      },
      provider: 'email',
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
  expires_at: 1685523274,
  refresh_token: '4khtZLeGwzs9qdn0TVdosg',
  user: {
    id: '04763bdf-0d5b-4eb4-8208-71851054e162',
    aud: 'authenticated',
    role: 'authenticated',
    email: 'email@example.com',
    phone: '',
    phone_confirmed_at: '2023-05-24T08:54:33.622982134Z',
    confirmation_sent_at: '2023-05-24T08:53:42.159929Z',
    last_sign_in_at: '2023-05-24T08:54:33.623890065Z',
    app_metadata: {
      provider: 'email',
      providers: ['email'],
    },
    user_metadata: {},
    identities: [
      {
        id: '04763bdf-0d5b-4eb4-8208-71851054e162',
        user_id: '04763bdf-0d5b-4eb4-8208-71851054e162',
        identity_data: {
          email: 'jumaantony840@gmail.com',
          sub: 'b5eabce2-1217-4c88-893f-c5e25bb933f5',
        },
        provider: 'email',
        last_sign_in_at: '2023-05-24T08:53:41.972681Z',
        created_at: '2023-05-24T08:53:41.972716Z',
        updated_at: '2023-05-24T08:53:41.972716Z',
      },
    ],
    created_at: '2023-05-24T08:53:41.96855Z',
    updated_at: '2023-05-24T08:54:33.628408Z',
  },
};

export class EmailSignUpResponse implements UserSignUpResponse {
  @ApiProperty({
    example: emailResponseExample,
  })
  readonly user: User;

  @ApiProperty({
    example: null,
  })
  readonly session: Session | null;
}

export class EmailSignInResponse implements UserSignInResponse {
  @ApiProperty({
    example: emailResponseExample,
  })
  readonly user: User;
  @ApiProperty({
    example: sessionResponseExample,
  })
  readonly session: Session;
}
