import { Injectable } from '@nestjs/common';
import { CreateInstitutionDto } from './dto/create-institution.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class InstitutionService {
  constructor(private prisma: PrismaService) {}

  async createOrUpdate(createInstitutionDto: CreateInstitutionDto, files?: any) {
    const data: any = { ...createInstitutionDto };
    if (files?.icono) {
      data.icono = files.icono[0].filename;
    }
    if (files?.imagen_sello) {
      data.imagen_sello = files.imagen_sello[0].filename;
    }

    const existing = await this.prisma.datosInstitucion.findFirst();
    if (existing) {
      return this.prisma.datosInstitucion.update({
        where: { id_datos: existing.id_datos },
        data,
      });
    } else {
      return this.prisma.datosInstitucion.create({
        data,
      });
    }
  }

  findOne() {
    return this.prisma.datosInstitucion.findFirst();
  }
}
