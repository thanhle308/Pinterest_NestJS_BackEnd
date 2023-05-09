import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

import { nguoi_dung } from '@prisma/client';
import { userLogin } from './dto/auth.dto';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/login')
  login(@Body() body: userLogin) {
    return this.authService.login(body);
  }

  @Post('/signup')
  signUp(@Body() body: nguoi_dung) {
    return this.authService.signUp(body);
  }
}
