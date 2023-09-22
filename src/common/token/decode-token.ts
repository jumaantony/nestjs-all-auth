import * as jwt from 'jsonwebtoken';
import { TokenError } from '@common/token/token-error';

export function decodeToken(token: string) {
  try {
    const decodedToken = jwt.verify(token, process.env.SUPABASE_JWT_SECRET);
    return decodedToken;
  } catch (error) {
    throw new TokenError(error.message, 401);
  }
}
