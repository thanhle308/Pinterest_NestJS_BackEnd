import { Injectable, UnauthorizedException } from '@nestjs/common';

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
    const user = await this.prisma.nguoi_dung.findFirst({
      where: {
        email: userLogin.email,
      },
    });

    if (user?.mat_khau !== userLogin.mat_khau) {
      throw new UnauthorizedException();
    }
    const payload = { email: user.email, nguoi_dung_id: user.nguoi_dung_id };
    return {
      access_token: await this.jwtService.sign(
        { payload },
        { secret: this.config.get('SECRET_KEY'), expiresIn: '365d' },
      ),
    };
  }

  async signUp(user: nguoi_dung) {
    const newUser = await this.prisma.nguoi_dung.create({ data: user });
    return newUser;
  }
}
