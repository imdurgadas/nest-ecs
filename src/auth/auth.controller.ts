import { Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GetCurrentUser } from './decorator/user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/user')
  async get(@GetCurrentUser() user) {
    return await this.authService.getCurrentUser(user);
  }
}
