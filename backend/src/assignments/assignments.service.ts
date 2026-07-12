import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class AssignmentsService {
  constructor(private prisma: PrismaService) {}

  async create(createAssignmentDto: CreateAssignmentDto) {
    const { id_situacion_revista, cuil_profesor_reemplazado, nota_desempeno, fundamentacion_baja_nota, ...rest } = createAssignmentDto;

    const data: Prisma.DesignacionUncheckedCreateInput = {
      ...rest,
      id_situacion_revista,
      cuil_profesor_reemplazado: id_situacion_revista === 3 ? cuil_profesor_reemplazado : null,
      nota_desempeno: nota_desempeno ?? null,
      fundamentacion_baja_nota: (nota_desempeno !== null && nota_desempeno !== undefined && nota_desempeno < 6) ? fundamentacion_baja_nota : null,
    };

    if (id_situacion_revista === 3 && !data.cuil_profesor_reemplazado) {
      throw new BadRequestException('El CUIL del profesor reemplazado es obligatorio para suplencias');
    }

    if (nota_desempeno !== undefined && nota_desempeno !== null) {
      if (nota_desempeno < 1 || nota_desempeno > 10) {
        throw new BadRequestException('La nota de desempeño debe estar entre 1.00 y 10.00');
      }
      if (nota_desempeno < 6 && !data.fundamentacion_baja_nota) {
        throw new BadRequestException('En caso de que el agente calificador asignara nota inferior a 6 puntos, deberá fundamentar en hoja aparte.');
      }
    }

    if (data.fecha_posesion) data.fecha_posesion = new Date(data.fecha_posesion as any);
    if (data.fecha_cese) data.fecha_cese = new Date(data.fecha_cese as any);

    return this.prisma.extended.designacion.create({ data });
  }

  findAll() {
    return this.prisma.extended.designacion.findMany();
  }

  findOne(id: number) {
    return this.prisma.extended.designacion.findUnique({
      where: { id_designacion: id },
    });
  }

  async update(id: number, updateAssignmentDto: UpdateAssignmentDto) {
    const current = await this.prisma.extended.designacion.findUnique({ where: { id_designacion: id } });
    if (!current) throw new NotFoundException('Designación no encontrada');

    let finalSit = updateAssignmentDto.id_situacion_revista ?? current.id_situacion_revista;
    let finalCuil = (updateAssignmentDto.cuil_profesor_reemplazado !== undefined) ? updateAssignmentDto.cuil_profesor_reemplazado : current.cuil_profesor_reemplazado;
    let finalNota = (updateAssignmentDto.nota_desempeno !== undefined) ? updateAssignmentDto.nota_desempeno : current.nota_desempeno;
    let finalFundamentacion = (updateAssignmentDto.fundamentacion_baja_nota !== undefined) ? updateAssignmentDto.fundamentacion_baja_nota : current.fundamentacion_baja_nota;

    if (finalSit !== 3) {
      finalCuil = null;
    } else {
      if (!finalCuil) throw new BadRequestException('El CUIL del profesor reemplazado es obligatorio para suplencias');
    }

    if (finalNota !== null && finalNota !== undefined) {
        const notaNum = Number(finalNota);
        if (notaNum < 6 && !finalFundamentacion) {
            throw new BadRequestException('En caso de que el agente calificador asignara nota inferior a 6 puntos, deberá fundamentar en hoja aparte.');
        }
        if (notaNum >= 6) {
            finalFundamentacion = null;
        }
    }

    const data: Prisma.DesignacionUncheckedUpdateInput = {
      ...updateAssignmentDto,
      id_situacion_revista: finalSit,
      cuil_profesor_reemplazado: finalCuil,
      nota_desempeno: finalNota,
      fundamentacion_baja_nota: finalFundamentacion,
    };
    
    if (data.fecha_posesion) data.fecha_posesion = new Date(data.fecha_posesion as any);
    if (data.fecha_cese) data.fecha_cese = new Date(data.fecha_cese as any);

    return this.prisma.extended.designacion.update({
      where: { id_designacion: id },
      data,
    });
  }
}
