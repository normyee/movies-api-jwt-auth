import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user) {
    const payload = { sub: user.id, email: user.email };

    return {
      token: this.jwtService.sign(payload),
    };
  }

  async validateUser(email: string, password: string) {
    try {
      const user = await this.userService.findByEmail(email);

      const isPasswordValid = await compare(password, user.password);

      if (!isPasswordValid) {
        return null;
      }

      return user;
    } catch (error) {
      return null;
    }
  }
}
