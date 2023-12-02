import { Controller, Post, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/application/services/auth/auth.service';
import { Request } from 'express';
import { UserEntity } from 'src/infra/data/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Req() req: Request & { user: UserEntity }) {
    return await this.authService.login(req.user);
  }
}
