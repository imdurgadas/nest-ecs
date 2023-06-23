import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OktaJwtVerifier from '@okta/jwt-verifier';

@Injectable()
export class AuthService {
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
    console.log(
      `In Validate Token Method: ${token} , audience: ${this.audience}`,
    );
    try {
      var jwt = await this.oktaVerifier.verifyAccessToken(token, this.audience);
    } catch (error) {
      throw new UnauthorizedException(error);
    }
    return jwt;
  }
}
