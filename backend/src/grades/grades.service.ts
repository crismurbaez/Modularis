import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGradeDto } from './dto/create-grade.dto';
import { UpdateGradeDto } from './dto/update-grade.dto';

@Injectable()
export class GradesService {
  constructor(private prisma: PrismaService) {}

  async create(createGradeDto: CreateGradeDto) {
    let { condicion_materia, mes_acreditacion, anio_acreditacion, nota_cuat1, nota_cuat2, ...rest } = createGradeDto;

    // Regla de Negocio: Transición de Estado y Acreditación
    if (condicion_materia === 'APROBADO') {
      if (!mes_acreditacion || !anio_acreditacion) {
        throw new BadRequestException('Para una materia APROBADA, el mes y año de acreditación son obligatorios.');
      }
    } else if (condicion_materia === 'PENDIENTE') {
      mes_acreditacion = null;
      anio_acreditacion = null;
    } else if (nota_cuat1 && nota_cuat2) {
      // Auto-calcular si hay 2 notas numéricas
      const n1 = Number(nota_cuat1);
      const n2 = Number(nota_cuat2);
      if (!isNaN(n1) && !isNaN(n2)) {
        if (n1 >= 4 && n2 >= 4) {
          condicion_materia = 'APROBADO';
          if (!mes_acreditacion || !anio_acreditacion) {
            throw new BadRequestException('Condición calculada como APROBADO: requiere mes y año de acreditación.');
          }
        } else {
          condicion_materia = 'PENDIENTE';
          mes_acreditacion = null;
          anio_acreditacion = null;
        }
      }
    }

    const data: any = {
      ...rest,
      nota_cuat1,
      nota_cuat2,
      condicion_materia,
      mes_acreditacion,
      anio_acreditacion,
    };

    return this.prisma.client.cursadaNota.create({ data });
  }

  findAll() {
    return this.prisma.client.cursadaNota.findMany();
  }

  findOne(id: number) {
    return this.prisma.client.cursadaNota.findUnique({
      where: { id_cursada: id },
    });
  }

  update(id: number, updateGradeDto: UpdateGradeDto) {
    return this.prisma.client.cursadaNota.update({
      where: { id_cursada: id },
      data: updateGradeDto as any,
    });
  }
}
