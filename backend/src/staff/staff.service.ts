import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { CreateAbsenceDto } from './dto/create-absence.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StaffService {
  private cryptoKey: string;

  constructor(private prisma: PrismaService) {
    this.cryptoKey = process.env.CRYPTO_KEY || 'default_key';
  }

  async checkDuplicates(tx: any, dni: string, cuil: string, idToIgnore?: number) {
    const whereClause: any = { OR: [{ dni }, { cuil }] };
    if (idToIgnore) {
      whereClause.NOT = { id_personal: idToIgnore };
    }
    const existing = await tx.personalDocente.findFirst({ where: whereClause });
    if (existing) {
      if (existing.dni === dni) throw new ConflictException(`El DNI ${dni} ya está registrado`);
      if (existing.cuil === cuil) throw new ConflictException(`El CUIL ${cuil} ya está registrado`);
    }
  }

  async create(createStaffDto: CreateStaffDto) {
    return this.prisma.$transaction(async (tx) => {
      await tx.$executeRawUnsafe(`SET LOCAL app.crypto_key = '${this.cryptoKey}';`);
      await this.checkDuplicates(tx, createStaffDto.dni, createStaffDto.cuil);
      const result = await tx.personalDocente.create({ data: createStaffDto });
      return result;
    });
  }

  async findAll() {
    return this.prisma.$transaction(async (tx) => {
      await tx.$executeRawUnsafe(`SET LOCAL app.crypto_key = '${this.cryptoKey}';`);
      return tx.personalDocente.findMany();
    });
  }

  async findOne(id: number) {
    return this.prisma.$transaction(async (tx) => {
      await tx.$executeRawUnsafe(`SET LOCAL app.crypto_key = '${this.cryptoKey}';`);
      
      // Due to relation being on a view, include might not work perfectly if it's not supported by Prisma natively for views.
      // But we mapped it as a model, so it should work.
      const staff = await tx.personalDocente.findFirst({
        where: { id_personal: id },
        include: { inasistencias: true },
      });
      
      if (!staff) throw new NotFoundException('Personal docente no encontrado');

      const totalFaltas = staff.inasistencias?.length || 0;
      return { ...staff, estadistica_faltas_totales: totalFaltas };
    });
  }

  async update(id: number, updateStaffDto: UpdateStaffDto) {
    return this.prisma.$transaction(async (tx) => {
      await tx.$executeRawUnsafe(`SET LOCAL app.crypto_key = '${this.cryptoKey}';`);
      
      const existing = await tx.personalDocente.findFirst({ where: { id_personal: id } });
      if (!existing) throw new NotFoundException('Personal docente no encontrado');

      if (updateStaffDto.dni || updateStaffDto.cuil) {
        await this.checkDuplicates(
          tx,
          updateStaffDto.dni || existing.dni,
          updateStaffDto.cuil || existing.cuil,
          id
        );
      }
      
      const result = await tx.personalDocente.update({
        where: { id_personal: id },
        data: updateStaffDto,
      });
      return result;
    });
  }

  async addAbsence(id: number, createAbsenceDto: CreateAbsenceDto) {
    return this.prisma.inasistenciasDiariasDocentes.create({
      data: {
        id_personal: id,
        ...createAbsenceDto,
        fecha: new Date(),
      },
    });
  }
}
