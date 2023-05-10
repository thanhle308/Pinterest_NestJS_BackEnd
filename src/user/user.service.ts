import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient, hinh_anh, nguoi_dung } from '@prisma/client';
import { data_decode } from './dto/user.dto';
@Injectable()
export class UserService {
  prisma = new PrismaClient();
  constructor(private jwtService: JwtService) {}

  async decode(code) {
    const token = code.headers.authorization;
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

  async removeImage(id: number) {
    await this.prisma.hinh_anh.delete({
      where: {
        hinh_id: Number(id),
      },
    });

    return id;
  }

  async imgPost(req, img: hinh_anh) {
    const nguoi_dung_id = await this.decode(req);
    img.nguoi_dung_id = nguoi_dung_id;
    const data = await this.prisma.hinh_anh.create({
      data: img,
    });
    return data;
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
}
