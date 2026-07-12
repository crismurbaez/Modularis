import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StudentsService {
  constructor(private prisma: PrismaService) {}

  async create(createStudentDto: CreateStudentDto) {
    let { id_estado, id_motivo_baja, fecha_nacimiento, ...rest } = createStudentDto;
    
    // Regla de Negocio: Validar estado BAJA y REGULAR
    if (id_estado === 2) {
      if (!id_motivo_baja) {
        throw new BadRequestException('El motivo de baja es obligatorio cuando el estado es BAJA.');
      }
    } else if (id_estado === 1) {
      id_motivo_baja = null as any; // Sanitizar motivo de baja si es REGULAR
    }

    const data: any = {
      ...rest,
      id_estado,
      id_motivo_baja,
    };

    if (fecha_nacimiento) {
      data.fecha_nacimiento = new Date(fecha_nacimiento);
    }

    const student = await this.prisma.extended.alumno.create({ data });
    return this.calculateAge(student);
  }

  async findAll() {
    const students = await this.prisma.extended.alumno.findMany();
    return students.map((s: any) => this.calculateAge(s));
  }

  async findOne(id: number) {
    const student = await this.prisma.extended.alumno.findUnique({
      where: { id_alumno: id },
    });
    if (!student) return null;
    return this.calculateAge(student);
  }

  async update(id: number, updateStudentDto: UpdateStudentDto) {
    let { id_estado, id_motivo_baja, fecha_nacimiento, ...rest } = updateStudentDto;

    const currentStudent = await this.prisma.extended.alumno.findUnique({ where: { id_alumno: id } });
    if (!currentStudent) throw new BadRequestException('Estudiante no encontrado');

    const finalEstado = id_estado ?? currentStudent.id_estado;
    let finalMotivo = id_motivo_baja ?? currentStudent.id_motivo_baja;

    if (finalEstado === 2) {
      if (!finalMotivo) throw new BadRequestException('El motivo de baja es obligatorio cuando el estado es BAJA.');
    } else if (finalEstado === 1) {
      finalMotivo = null;
    }

    const data: any = { ...rest, id_estado: finalEstado, id_motivo_baja: finalMotivo };
    if (fecha_nacimiento) data.fecha_nacimiento = new Date(fecha_nacimiento);

    const updated = await this.prisma.extended.alumno.update({
      where: { id_alumno: id },
      data,
    });
    return this.calculateAge(updated);
  }

  private calculateAge(student: any) {
    if (student.fecha_nacimiento) {
      const today = new Date(); // Ideally this would use 'ciclo_lectivo' context as per BRD, but using today as a fallback
      const birthDate = new Date(student.fecha_nacimiento);
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      student.edad = age;
    }
    return student;
  }
}
