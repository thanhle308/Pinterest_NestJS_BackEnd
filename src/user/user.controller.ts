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
  UseInterceptors,
  UseGuards,
  UploadedFile,
} from '@nestjs/common';
import { UserService } from './user.service';
import { binh_luan, hinh_anh, nguoi_dung } from '@prisma/client';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
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
  removeImage(@Param('id') id) {
    return this.userService.removeImage(id);
  }

  @Post('/post-info')
  imgPost(@Request() req, @Body() body: hinh_anh) {
    // return file.path;
    return this.userService.imgPost(req, body);
  }

  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: process.cwd() + '/public/img',
        filename: (req, file, callback) =>
          callback(null, Date.now() + '_' + file.originalname),
      }),
    }),
  )
  @Post('/upload-img')
  upLoadImage(
    @Request() req,
    @Body() body,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return file.path;
    // try {
    //   return this.userService.upLoadImage(req, body, file);
    // } catch (error) {
    //   throw new HttpException('Lỗi BE', 500);
    // }
  }

  @Put('/update-profile')
  updateProfile(@Request() req, @Body() body: nguoi_dung) {
    return this.userService.updateProfile(req, body);
  }

  @Post('/comment')
  saveComment(@Request() req, @Body() body: binh_luan) {
    return this.userService.saveComment(req, body);
  }
}
