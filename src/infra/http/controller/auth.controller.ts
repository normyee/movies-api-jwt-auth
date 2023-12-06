import { Controller, Post, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/application/services/auth/auth.service';
import { Request } from 'express';
import { UserEntity } from 'src/infra/data/user.entity';
import { ApiTags, ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  @ApiOperation({ summary: 'Authenticate user.' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', example: 'amimisisi@gmail.com' },
        password: {
          type: 'string',
          example: 'Siwi@afkdi2i9',
          format: 'password',
        },
      },
      required: ['email', 'password'],
    },
  })
  @ApiResponse({
    status: 201,
    description: 'It authenticates user and then generates an access token.',
  })
  @ApiResponse({
    status: 401,
    description: 'When email and/or password is/are invalid!',
  })
  async login(@Req() req: Request & { user: UserEntity }) {
    return await this.authService.login(req.user);
  }
}
