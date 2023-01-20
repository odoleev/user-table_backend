import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '../schemas/users.schemas';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string): Promise<User | null> {
    const user = await this.usersService.findOneByEmail(email);

    if (!user) {
      return null;
    }

    return user;
  }

  async generateToken(user: User) {
    return {
      accessToken: this.jwtService.sign({ user }),
    };
  }

  verifyToken(token: string) {
    try {
      return this.jwtService.verify(token);
    } catch (error) {
      return { error: error.message };
    }
  }
}
