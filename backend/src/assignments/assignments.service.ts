import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';

@Injectable()
export class AssignmentsService {
  constructor(private prisma: PrismaService) {}

  async create(createAssignmentDto: CreateAssignmentDto) {
    let { id_situacion_revista, cuil_profesor_reemplazado, nota_desempeno, fundamentacion_baja_nota, ...rest } = createAssignmentDto;

    // Regla 2.2: Suplencias y reemplazos
    if (id_situacion_revista !== 3) { // No es SUPLENTE
      cuil_profesor_reemplazado = null;
    } else {
      if (!cuil_profesor_reemplazado) {
        throw new BadRequestException('El CUIL del profesor reemplazado es obligatorio para suplencias');
      }
    }

    // Regla 2.1: Desempeño
    if (nota_desempeno !== undefined && nota_desempeno !== null) {
      if (nota_desempeno < 1 || nota_desempeno > 10) {
        throw new BadRequestException('La nota de desempeño debe estar entre 1.00 y 10.00');
      }
      if (nota_desempeno < 6) {
        if (!fundamentacion_baja_nota) {
          throw new BadRequestException('En caso de que el agente calificador asignara nota inferior a 6 puntos, deberá fundamentar en hoja aparte.');
        }
      } else {
        fundamentacion_baja_nota = null;
      }
    }

    const data: any = {
      ...rest,
      id_situacion_revista,
      cuil_profesor_reemplazado,
      nota_desempeno,
      fundamentacion_baja_nota,
    };

    if (data.fecha_posesion) data.fecha_posesion = new Date(data.fecha_posesion);
    if (data.fecha_cese) data.fecha_cese = new Date(data.fecha_cese);

    return this.prisma.client.designacion.create({ data });
  }

  findAll() {
    return this.prisma.client.designacion.findMany();
  }

  findOne(id: number) {
    return this.prisma.client.designacion.findUnique({
      where: { id_designacion: id },
    });
  }

  async update(id: number, updateAssignmentDto: UpdateAssignmentDto) {
    const current = await this.prisma.client.designacion.findUnique({ where: { id_designacion: id } });
    if (!current) throw new BadRequestException('Designación no encontrada');

    let finalSit = updateAssignmentDto.id_situacion_revista ?? current.id_situacion_revista;
    let finalCuil = updateAssignmentDto.cuil_profesor_reemplazado ?? current.cuil_profesor_reemplazado;
    let finalNota = updateAssignmentDto.nota_desempeno !== undefined ? updateAssignmentDto.nota_desempeno : current.nota_desempeno;
    let finalFundamentacion = updateAssignmentDto.fundamentacion_baja_nota ?? current.fundamentacion_baja_nota;

    if (finalSit !== 3) {
      finalCuil = null;
    } else {
      if (!finalCuil) throw new BadRequestException('El CUIL del profesor reemplazado es obligatorio para suplencias');
    }

    if (finalNota !== null) {
        const notaNum = Number(finalNota);
        if (notaNum < 6 && !finalFundamentacion) {
            throw new BadRequestException('En caso de que el agente calificador asignara nota inferior a 6 puntos, deberá fundamentar en hoja aparte.');
        }
        if (notaNum >= 6) {
            finalFundamentacion = null;
        }
    }

    const data: any = {
      ...updateAssignmentDto,
      id_situacion_revista: finalSit,
      cuil_profesor_reemplazado: finalCuil,
      nota_desempeno: finalNota,
      fundamentacion_baja_nota: finalFundamentacion,
    };
    
    if (data.fecha_posesion) data.fecha_posesion = new Date(data.fecha_posesion);
    if (data.fecha_cese) data.fecha_cese = new Date(data.fecha_cese);

    return this.prisma.client.designacion.update({
      where: { id_designacion: id },
      data,
    });
  }
}
