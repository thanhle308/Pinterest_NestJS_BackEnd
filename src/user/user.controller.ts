import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  HttpException,
  Headers,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { hinh_anh, nguoi_dung } from '@prisma/client';

// @UseGuards(AuthGuard('jwt'))
@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('/profile')
  getUser(@Request() req) {
    return this.userService.getUser(req);
  }

  @Get('/img-save')
  imgSave(@Request() req) {
    return this.userService.imgSave(req);
  }

  @Get('/img-posted')
  imgPosted(@Request() req) {
    return this.userService.imgPosted(req);
  }

  @Delete('/remove/:id')
  removeImage(@Param('id') id: number) {
    return this.userService.removeImage(id);
  }

  @Post('/post')
  imgPost(@Request() req, @Body() body: hinh_anh) {
    return this.userService.imgPost(req, body);
  }

  @Put('/update-profile')
  updateProfile(@Request() req, @Body() body: nguoi_dung) {
    return this.userService.updateProfile(req, body);
  }
}
