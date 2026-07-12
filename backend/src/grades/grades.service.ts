import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateGradeDto } from './dto/create-grade.dto';
import { UpdateGradeDto } from './dto/update-grade.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class GradesService {
  constructor(private prisma: PrismaService) {}

  async create(createGradeDto: CreateGradeDto) {
    let { condicion_materia, mes_acreditacion, anio_acreditacion, nota_cuat1, nota_cuat2, final_aprobado, ...rest } = createGradeDto as any;

    const data: any = {
      ...rest,
      nota_cuat1,
      nota_cuat2,
      condicion_materia,
      mes_acreditacion,
      anio_acreditacion,
    };

    // Regla de Negocio: Transición de Estado y Acreditación
    if (condicion_materia === 'APROBADO') {
      if (!mes_acreditacion || !anio_acreditacion) {
        throw new BadRequestException('Para una materia APROBADA, el mes y año de acreditación son obligatorios.');
      }
    } else if (final_aprobado === false) {
      data.mes_acreditacion = null as any;
      data.anio_acreditacion = null as any;
    } else if (nota_cuat1 && nota_cuat2) {
      // Auto-calcular si hay 2 notas numéricas
      const n1 = Number(nota_cuat1);
      const n2 = Number(nota_cuat2);
      if (!isNaN(n1) && !isNaN(n2)) {
        if (n1 >= 4 && n2 >= 4) {
          data.condicion_materia = 'APROBADO';
          if (!mes_acreditacion || !anio_acreditacion) {
            throw new BadRequestException('Condición calculada como APROBADO: requiere mes y año de acreditación.');
          }
        } else {
          data.condicion_materia = 'PENDIENTE';
          data.mes_acreditacion = null as any;
          data.anio_acreditacion = null as any;
        }
      }
    }

    return this.prisma.extended.cursadaNota.create({ data });
  }

  findAll() {
    return this.prisma.extended.cursadaNota.findMany();
  }

  findOne(id: number) {
    return this.prisma.extended.cursadaNota.findUnique({
      where: { id_cursada: id },
    });
  }

  update(id: number, data: Prisma.CursadaNotaUpdateInput) {
    return this.prisma.extended.cursadaNota.update({
      where: { id_cursada: id },
      data: data,
    });
  }
}
