import {
	CanActivate,
	ExecutionContext,
	Injectable,
	UnauthorizedException,
  } from '@nestjs/common';
  import { extractTokenFromHeader } from '@common/token/extract-token';
  import { Observable } from 'rxjs';
  import { Request } from 'express';
  import { decodeToken } from '@common/token/decode-token';
  import { ExtendedUser } from '@common/types/common.types';
  
  @Injectable()
  export class IsAuthenticatedUserGuard implements CanActivate {
	canActivate(
	  context: ExecutionContext,
	): boolean | Promise<boolean> | Observable<boolean> {
	  const request: Request = context.switchToHttp().getRequest();
	  const token = extractTokenFromHeader(request.headers);
	  if (!token) {
		throw new UnauthorizedException('A valid bearer token is required');
	  }
	  try {
		const decodedToken = decodeToken(token) as ExtendedUser;
		if (decodedToken.aud) {
		  request['userId'] = decodedToken.sub;
		  return true;
		}
	  } catch (error) {
		throw error;
	  }
	  return false;
	}
  }
  