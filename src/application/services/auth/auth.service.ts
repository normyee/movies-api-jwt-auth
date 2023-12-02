import { Injectable, Inject } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { UserEntity } from 'src/infra/data/user.entity';
import { validatePasswords } from 'src/infra/helpers/password-comparer.helper';

@Injectable()
export class AuthService {
  private readonly CACHE_TIME = 60000;
  private readonly CACHE_PREFIX: 'cached:';

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  // tokenize login
  async login(user: UserEntity) {
    const payload = { sub: user.id, email: user.email };

    return {
      token: this.jwtService.sign(payload),
    };
  }

  // local strategy method with passport for login validation
  async validateUser(email: string, password: string) {
    try {
      const cachedUser = await this.cacheManager.get<UserEntity>(
        `${this.CACHE_PREFIX}${email}`,
      );

      // checks if there is already a cached login

      if (cachedUser) {
        const isPasswordValid = await validatePasswords(
          password,
          cachedUser.password,
        );

        if (!isPasswordValid) {
          return null;
        }

        return cachedUser;
      }

      // If not found, it searches in the database

      const user = await this.userService.findByEmail(email);

      const isPasswordValid = await validatePasswords(password, user.password);

      if (!isPasswordValid) {
        return null;
      }

      await this.cacheManager.set(
        `${this.CACHE_PREFIX}${email}`,
        user,
        this.CACHE_TIME,
      );

      return user;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
