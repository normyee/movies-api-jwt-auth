import { Injectable, Inject } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { UserEntity } from 'src/infra/data/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  // tokenize login
  async login(user) {
    const payload = { sub: user.id, email: user.email };

    return {
      token: this.jwtService.sign(payload),
    };
  }

  // local strategy method with passport for login validation
  async validateUser(email: string, password: string) {
    try {
      const cachedUser = await this.cacheManager.get(`cached:${email}`);

      if (
        cachedUser &&
        typeof cachedUser === 'object' &&
        'password' in cachedUser
      ) {
        const isPasswordValid = compare(
          password,
          cachedUser.password as string,
        );

        if (!isPasswordValid) {
          return null;
        }

        return cachedUser as UserEntity;
      }

      const user = await this.userService.findByEmail(email);

      const isPasswordValid = await compare(password, user.password);

      if (!isPasswordValid) {
        return null;
      }

      await this.cacheManager.set(`cached:${email}`, user, 60000);

      return user;
    } catch (error) {
      return null;
    }
  }
}
