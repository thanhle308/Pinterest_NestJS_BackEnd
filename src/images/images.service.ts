import { Injectable } from '@nestjs/common';

import { PrismaClient, binh_luan } from '@prisma/client';
import { searchImg } from './dto/img.dto';

@Injectable()
export class ImagesService {
  prisma = new PrismaClient();

  async images() {
    return this.prisma.hinh_anh.findMany();
  }

  async searchName(name: searchImg) {
    const data = await this.prisma.hinh_anh.findMany({
      where: {
        ten_hinh: name.name,
      },
    });
    return data;
  }

  async infoImg(id: number) {
    const data = await this.prisma.hinh_anh.findFirst({
      where: {
        hinh_id: Number(id),
      },
    });
    return data;
  }

  async infoComment(id: number) {
    const data = await this.prisma.binh_luan.findMany({
      where: {
        hinh_id: Number(id),
      },
    });
    return data;
  }

  async infoSave(id: number) {
    const data = await this.prisma.luu_anh.findFirst({
      where: {
        hinh_id: Number(id),
      },
    });
    return data;
  }

  async saveComment(comment: binh_luan) {
    const newComment = await this.prisma.binh_luan.create({
      data: comment,
    });
    return newComment;
  }
}
