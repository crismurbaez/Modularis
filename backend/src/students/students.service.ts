import { Injectable, BadRequestException, ConflictException } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StudentsService {
  private cryptoKey: string;

  constructor(private prisma: PrismaService) {
    this.cryptoKey = process.env.CRYPTO_KEY || 'default_key';
  }

  async checkDuplicates(tx: any, dni: string, cuil: string, idToIgnore?: number) {
    const whereClause: any = { OR: [{ dni }, { cuil }] };
    if (idToIgnore) {
      whereClause.NOT = { id_alumno: idToIgnore };
    }
    const existing = await tx.alumno.findFirst({ where: whereClause });
    if (existing) {
      if (existing.dni === dni) throw new ConflictException(`El DNI ${dni} ya está registrado`);
      if (existing.cuil === cuil) throw new ConflictException(`El CUIL ${cuil} ya está registrado`);
    }
  }

  async create(createStudentDto: CreateStudentDto) {
    return this.prisma.$transaction(async (tx) => {
      await tx.$executeRawUnsafe(`SET LOCAL app.crypto_key = '${this.cryptoKey}';`);
      
      let { id_estado, id_motivo_baja, ...rest } = createStudentDto;
      
      if (id_estado === 2) {
        if (!id_motivo_baja) {
          throw new BadRequestException('El motivo de baja es obligatorio cuando el estado es BAJA.');
        }
      } else if (id_estado === 1) {
        id_motivo_baja = null as any; 
      }

      await this.checkDuplicates(tx, createStudentDto.dni, createStudentDto.cuil);

      const data: any = {
        ...rest,
        id_estado,
        id_motivo_baja,
      };

      const student = await tx.alumno.create({ data });
      return this.calculateAge(student);
    });
  }

  async findAll() {
    return this.prisma.$transaction(async (tx) => {
      await tx.$executeRawUnsafe(`SET LOCAL app.crypto_key = '${this.cryptoKey}';`);
      const students = await tx.alumno.findMany();
      return students.map((s: any) => this.calculateAge(s));
    });
  }

  async findOne(id: number) {
    return this.prisma.$transaction(async (tx) => {
      await tx.$executeRawUnsafe(`SET LOCAL app.crypto_key = '${this.cryptoKey}';`);
      const student = await tx.alumno.findUnique({
        where: { id_alumno: id },
      });
      if (!student) return null;
      return this.calculateAge(student);
    });
  }

  async update(id: number, updateStudentDto: UpdateStudentDto) {
    return this.prisma.$transaction(async (tx) => {
      await tx.$executeRawUnsafe(`SET LOCAL app.crypto_key = '${this.cryptoKey}';`);
      
      let { id_estado, id_motivo_baja, ...rest } = updateStudentDto;

      const currentStudent = await tx.alumno.findUnique({ where: { id_alumno: id } });
      if (!currentStudent) throw new BadRequestException('Estudiante no encontrado');

      if (updateStudentDto.dni || (updateStudentDto as any).cuil) {
        await this.checkDuplicates(
          tx,
          updateStudentDto.dni || currentStudent.dni, 
          (updateStudentDto as any).cuil || currentStudent.cuil, 
          id
        );
      }

      const finalEstado = id_estado ?? currentStudent.id_estado;
      let finalMotivo = id_motivo_baja ?? currentStudent.id_motivo_baja;

      if (finalEstado === 2) {
        if (!finalMotivo) throw new BadRequestException('El motivo de baja es obligatorio cuando el estado es BAJA.');
      } else if (finalEstado === 1) {
        finalMotivo = null;
      }

      const data: any = { ...rest, id_estado: finalEstado, id_motivo_baja: finalMotivo };
      
      const updated = await tx.alumno.update({
        where: { id_alumno: id },
        data: data,
      });
      return this.calculateAge(updated);
    });
  }

  private calculateAge(student: any) {
    if (student.fecha_nacimiento) {
      const today = new Date();
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

