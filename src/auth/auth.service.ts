import { Injectable } from '@nestjs/common';

import { nguoi_dung } from '@prisma/client';
import { userLogin } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class AuthService {
  prisma = new PrismaClient();
  constructor(private jwtService: JwtService, private config: ConfigService) {}
  async login(userLogin: userLogin) {
    const token = this.jwtService.sign(
      { data: 'node 29' },
      { secret: this.config.get('SECRET_KEY'), expiresIn: '30m' },
    );

    return token;
  }
  async signUp(user: nguoi_dung) {
    const newUser = await this.prisma.nguoi_dung.create({ data: user });
    return newUser;
  }
}
