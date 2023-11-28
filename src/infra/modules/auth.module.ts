import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from '../../application/services/auth/auth.service';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from './user.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from '../http/controller/auth.controller';
import { LocalStrategy } from 'src/application/services/auth/strategies/local.strategy';

@Module({
  imports: [
    ConfigModule.forRoot(),
    forwardRef(() => UserModule),
    PassportModule,
    JwtModule.register({
      privateKey: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy],
})
export class AuthModule {}
