import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IAccessTokenPayload } from '../interfaces/auth.interfaces';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as IAccessTokenPayload;
  },
);
