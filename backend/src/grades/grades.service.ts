import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateGradeDto } from './dto/create-grade.dto';
import { UpdateGradeDto } from './dto/update-grade.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class GradesService {
  constructor(private prisma: PrismaService) {}

  async create(createGradeDto: CreateGradeDto) {
    let { id_condicion_materia, mes_acreditacion, anio_acreditacion, nota_cuat1, nota_cuat2, id_materia, ...rest } = createGradeDto as any;

    const data: any = {
      ...rest,
      id_materia,
      nota_cuat1,
      nota_cuat2,
      id_condicion_materia,
      mes_acreditacion,
      anio_acreditacion,
    };

    // Regla de Negocio: Transición de Estado y Acreditación
    if (id_condicion_materia === 1) { // APROBADO
      if (!mes_acreditacion || !anio_acreditacion) {
        throw new BadRequestException('Para una materia APROBADA, el mes y año de acreditación son obligatorios.');
      }
    } else if (id_condicion_materia === 2) { // PENDIENTE
      data.mes_acreditacion = null;
      data.anio_acreditacion = null;
    } else if (nota_cuat1 && nota_cuat2) {
      // Auto-calcular si hay 2 notas numéricas
      const n1 = Number(nota_cuat1);
      const n2 = Number(nota_cuat2);
      if (!isNaN(n1) && !isNaN(n2)) {
        if (n1 >= 4 && n2 >= 4) {
          data.id_condicion_materia = 1; // APROBADO
          if (!mes_acreditacion || !anio_acreditacion) {
            throw new BadRequestException('Condición calculada como APROBADO: requiere mes y año de acreditación.');
          }
        } else {
          data.id_condicion_materia = 2; // PENDIENTE
          data.mes_acreditacion = null;
          data.anio_acreditacion = null;
        }
      }
    }

    return this.prisma.cursadaNota.create({ data });
  }

  findAll() {
    return this.prisma.cursadaNota.findMany();
  }

  findOne(id: number) {
    return this.prisma.cursadaNota.findUnique({
      where: { id_cursada: id },
    });
  }

  update(id: number, data: Prisma.CursadaNotaUpdateInput) {
    return this.prisma.cursadaNota.update({
      where: { id_cursada: id },
      data: data,
    });
  }
}
