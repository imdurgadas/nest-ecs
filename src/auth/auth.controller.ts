import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  @Get()
  get(@Req() request: Request) {
    return request.headers.authorization;
  }
}
