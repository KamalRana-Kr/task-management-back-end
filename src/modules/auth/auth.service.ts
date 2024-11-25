import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private readonly users = [
    { id: 1, username: 'test@gmail.com', password: 'test@123' },
  ];

  constructor(private readonly jwtService: JwtService) {}

  validateUser(username: string, password: string): any {
    const user = this.users.find((user) => user.username === username);

    if (!user) {
      throw new UnauthorizedException('Invalid Username');
    }

    if (user.password !== password) {
      throw new UnauthorizedException('Invalid Password');
    }

    return { id: user.id, username: user.username };
  }

  login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
