import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import { GetCurrentUser } from './decorator/user.decorator';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/user')
  async get(@GetCurrentUser() user) {
    return await this.authService.getCurrentUser(user);
  }
}
