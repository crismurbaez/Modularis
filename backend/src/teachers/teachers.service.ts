import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { CreateAbsenceDto } from './dto/create-absence.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class TeachersService {
  constructor(private prisma: PrismaService) {}

  async create(createTeacherDto: CreateTeacherDto) {
    const data: Prisma.ProfesorCreateInput = { ...createTeacherDto };
    if (data.fecha_nacimiento) data.fecha_nacimiento = new Date(data.fecha_nacimiento);
    return this.prisma.extended.profesor.create({ data });
  }

  findAll() {
    return this.prisma.extended.profesor.findMany();
  }

  async findOne(id: number) {
    const teacher = await this.prisma.extended.profesor.findUnique({
      where: { id_profesor: id },
      include: { inasistencias_docentes: true },
    });
    
    if (!teacher) throw new NotFoundException('Docente no encontrado');

    // Regla de Negocio: Control Estadístico de Inasistencias (S.E.T. 4 Punto 1.14)
    const totalFaltas = teacher.inasistencias_docentes.reduce((acc: number, curr: any) => {
      return acc + (curr.faltas_enfermedad || 0) 
                 + (curr.faltas_causas_priv || 0) 
                 + (curr.faltas_otras_causas || 0) 
                 + (curr.faltas_injustificadas || 0);
    }, 0);

    return { ...teacher, estadistica_faltas_totales: totalFaltas };
  }

  async update(id: number, updateTeacherDto: UpdateTeacherDto) {
    const data: Prisma.ProfesorUpdateInput = { ...updateTeacherDto };
    if (data.fecha_nacimiento) data.fecha_nacimiento = new Date(data.fecha_nacimiento as string);
    return this.prisma.extended.profesor.update({
      where: { id_profesor: id },
      data,
    });
  }

  async addAbsence(id: number, createAbsenceDto: CreateAbsenceDto) {
    return this.prisma.extended.inasistenciaDocente.create({
      data: {
        id_profesor: id,
        ...createAbsenceDto,
      },
    });
  }
}
