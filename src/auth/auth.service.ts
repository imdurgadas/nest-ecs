import {
  ForbiddenException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OktaJwtVerifier from '@okta/jwt-verifier';
import { GetCurrentUser } from './decorator/user.decorator';

@Injectable()
export class AuthService {
  private logger = new Logger(AuthService.name);
  private oktaVerifier: OktaJwtVerifier;
  private audience: string;
  private scope: string;

  constructor(configService: ConfigService) {
    this.oktaVerifier = new OktaJwtVerifier({
      issuer: configService.get('OKTA_ISSUER'),
      clientId: configService.get('OKTA_CLIENTID'),
    });

    this.audience = configService.get('OKTA_AUDIENCE');
    this.scope = configService.get('SCOPE');
  }

  async validateToken(token: string): Promise<any> {
    try {
      var jwt = await this.oktaVerifier.verifyAccessToken(token, this.audience);
    } catch (error) {
      throw new UnauthorizedException(error);
    }
    if (!jwt.claims.scp.includes(this.scope)) {
      throw new ForbiddenException(
        'You are not allowed to access this application',
      );
    }

    return jwt;
  }

  async getCurrentUser(user) {
    this.logger.debug(`getCurrentUser, claims date: ${JSON.stringify(user)}`);

    const { sub, uid } = user;
    return { uid, sub };
  }
}
