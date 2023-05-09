import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ImagesService } from './images.service';

import { AuthGuard } from '@nestjs/passport';
import { searchImg } from './dto/img.dto';
import { binh_luan } from '@prisma/client';

// @UseGuards(AuthGuard('jwt'))
@Controller('/images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}
  @Get()
  images() {
    return this.imagesService.images();
  }
  @Get('/search-name')
  searchName(@Body() body: searchImg) {
    return this.imagesService.searchName(body);
  }
  @Get('/info-img/:id')
  infoImg(@Param('id') id: number) {
    return this.imagesService.infoImg(id);
  }
  @Get('/info-cmt/:id')
  infoComment(@Param('id') id: number) {
    return this.imagesService.infoComment(id);
  }
  @Get('/info-save/:id')
  infoSave(@Param('id') id: number) {
    return this.imagesService.infoSave(id);
  }
  @Post('/comment')
  saveComment(@Body() body: binh_luan) {
    return this.imagesService.saveComment(body);
  }
}
