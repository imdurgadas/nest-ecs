import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import constants from '../../config/constants';

@Injectable()
export class AtGuard extends AuthGuard('bearer') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride(constants.app.public, [
      context.getHandler(),
      context.getClass(),
    ]);

    /**
     * AtGuard is enforced on all routes, in order to allow unauthenticated routes, the handler needs to be marked as public.
     * The below logic skips checking for the AtGuard if the handler is marked as public.
     */

    if (isPublic) {
      return true;
    }

    return super.canActivate(context);
  }
}
