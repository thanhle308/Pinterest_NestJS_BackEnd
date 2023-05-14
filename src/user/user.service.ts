import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient, binh_luan, hinh_anh, nguoi_dung } from '@prisma/client';
import { data_decode } from './dto/user.dto';
@Injectable()
export class UserService {
  prisma = new PrismaClient();
  constructor(private jwtService: JwtService) {}

  async decode(code) {
    const token = code.headers.token;
    const data_decode: any = await this.jwtService.decode(token);
    return data_decode.payload.nguoi_dung_id;
  }

  async getUser(req) {
    const nguoi_dung_id = await this.decode(req);
    const info = await this.prisma.nguoi_dung.findFirst({
      where: {
        nguoi_dung_id: Number(nguoi_dung_id),
      },
    });
    return info;
  }
  async imgSave(req) {
    const nguoi_dung_id = await this.decode(req);
    const data = await this.prisma.luu_anh.findMany({
      where: {
        nguoi_dung_id: Number(nguoi_dung_id),
      },
    });
    return data;
  }

  async imgPosted(req) {
    const nguoi_dung_id = await this.decode(req);
    const data = await this.prisma.hinh_anh.findMany({
      where: {
        nguoi_dung_id: Number(nguoi_dung_id),
      },
    });
    return data;
  }

  async removeImage(id) {
    const removeSaved = this.prisma.luu_anh.deleteMany({
      where: {
        hinh_id: Number(id),
      },
    });
    const removeCmt = this.prisma.binh_luan.deleteMany({
      where: {
        hinh_id: Number(id),
      },
    });
    const removeImg = this.prisma.hinh_anh.delete({
      where: {
        hinh_id: Number(id),
      },
    });
    await this.prisma.$transaction([removeSaved, removeCmt, removeImg]);
    return 'delete done';
  }

  async imgPost(req, img: hinh_anh) {
    const nguoi_dung_id = await this.decode(req);
    img.nguoi_dung_id = nguoi_dung_id;
    const data = await this.prisma.hinh_anh.create({
      data: img,
    });
    return data;
  }

  async upLoadImage(req, img, file: any) {
    const nguoi_dung_id = await this.decode(req);

    return img;
  }

  async updateProfile(req, user: nguoi_dung) {
    const nguoi_dung_id: any = await this.decode(req);
    user.nguoi_dung_id = nguoi_dung_id;

    await this.prisma.nguoi_dung.update({
      data: user,
      where: {
        nguoi_dung_id: Number(nguoi_dung_id),
      },
    });
    return { Status: 'Update Done', user };
  }
  async saveComment(req, comment: binh_luan) {
    const nguoi_dung_id = await this.decode(req);
    comment.nguoi_dung_id = nguoi_dung_id;
    const newComment = await this.prisma.binh_luan.create({
      data: comment,
    });
    return comment;
  }
}
