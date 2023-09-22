import { HttpException } from '@nestjs/common';

export class TokenError extends HttpException {
  constructor(message: string, status: number) {
    super(message, status);
  }
}
