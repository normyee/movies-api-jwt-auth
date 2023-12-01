import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from '../../application/services/auth/auth.service';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from './user.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from '../http/controller/auth.controller';
import { LocalStrategy } from 'src/application/services/auth/strategies/local.strategy';
import { JwtStrategy } from 'src/application/services/auth/strategies/jwt.strategy';
import { MoviesModule } from './movies.module';
import { redisStore } from 'cache-manager-redis-yet';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CacheModule.register({ store: redisStore }),
    forwardRef(() => UserModule),
    forwardRef(() => MoviesModule),
    PassportModule,
    JwtModule.register({
      privateKey: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '300s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
