import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { CreateAbsenceDto } from './dto/create-absence.dto';

@Injectable()
export class TeachersService {
  constructor(private prisma: PrismaService) {}

  async create(createTeacherDto: CreateTeacherDto) {
    const data: any = { ...createTeacherDto };
    if (data.fecha_nacimiento) data.fecha_nacimiento = new Date(data.fecha_nacimiento);
    return this.prisma.client.profesor.create({ data });
  }

  findAll() {
    return this.prisma.client.profesor.findMany();
  }

  async findOne(id: number) {
    const teacher = await this.prisma.client.profesor.findUnique({
      where: { id_profesor: id },
      include: { inasistencias_docentes: true },
    });
    
    if (!teacher) throw new NotFoundException('Docente no encontrado');

    // Regla de Negocio: Control Estadístico de Inasistencias (S.E.T. 4 Punto 1.14)
    const totalFaltas = teacher.inasistencias_docentes.reduce((acc, curr) => {
      return acc + (curr.faltas_enfermedad || 0) 
                 + (curr.faltas_causas_priv || 0) 
                 + (curr.faltas_otras_causas || 0) 
                 + (curr.faltas_injustificadas || 0);
    }, 0);

    return { ...teacher, estadistica_faltas_totales: totalFaltas };
  }

  async update(id: number, updateTeacherDto: UpdateTeacherDto) {
    const data: any = { ...updateTeacherDto };
    if (data.fecha_nacimiento) data.fecha_nacimiento = new Date(data.fecha_nacimiento);
    return this.prisma.client.profesor.update({
      where: { id_profesor: id },
      data,
    });
  }

  async addAbsence(id: number, createAbsenceDto: CreateAbsenceDto) {
    return this.prisma.client.inasistenciaDocente.create({
      data: {
        id_profesor: id,
        ...createAbsenceDto,
      },
    });
  }
}
