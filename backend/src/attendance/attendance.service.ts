import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AttendanceService {
  constructor(private prisma: PrismaService) {}

  async registerBulk(bulkData: any) {
    const { id_curso_seccion, fecha, id_usuario, ausentes } = bulkData;
    
    const estado = await this.prisma.estadoAsistenciaCurso.create({
      data: {
        id_curso_seccion,
        fecha: new Date(fecha),
        id_usuario
      }
    });

    if (ausentes && ausentes.length > 0) {
      const faltas = ausentes.map((a: any) => ({
        id_alumno: a.id_alumno,
        fecha: new Date(fecha),
        id_causa: a.id_causa,
        observaciones: a.observaciones
      }));

      await this.prisma.inasistenciaAlumno.createMany({
        data: faltas,
        skipDuplicates: true
      });
    }
    
    return { success: true, estado };
  }

  async getCalendar(month: string, year: string) {
    const start = new Date(`${year}-${month.padStart(2, '0')}-01`);
    const end = new Date(start.getFullYear(), start.getMonth() + 1, 0);

    return this.prisma.calendarioAcademico.findMany({
      where: {
        fecha_inicio: { gte: start, lte: end }
      }
    });
  }
}
