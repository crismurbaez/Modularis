import { Injectable, BadRequestException, ConflictException } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { PrismaService } from '../prisma/prisma.service';
import { CryptoService } from '../crypto/crypto.service';

@Injectable()
export class StudentsService {
  constructor(
    private prisma: PrismaService,
    private cryptoService: CryptoService
  ) {}

  async checkDuplicates(dni: string, cuil: string, idToIgnore?: number) {
    const allStudents = await this.prisma.alumno.findMany();
    for (const student of allStudents) {
      if (idToIgnore && student.id_alumno === idToIgnore) continue;
      
      const decryptedDni = this.cryptoService.decrypt(student.dni);
      if (decryptedDni === dni) {
        throw new ConflictException(`El DNI ${dni} ya está registrado`);
      }
      const decryptedCuil = this.cryptoService.decrypt(student.cuil);
      if (decryptedCuil === cuil) {
        throw new ConflictException(`El CUIL ${cuil} ya está registrado`);
      }
    }
  }

  private encryptData(data: any) {
    const encrypted = { ...data };
    if (encrypted.dni) encrypted.dni = this.cryptoService.encrypt(encrypted.dni);
    if (encrypted.cuil) encrypted.cuil = this.cryptoService.encrypt(encrypted.cuil);
    if (encrypted.fecha_nacimiento) encrypted.fecha_nacimiento = this.cryptoService.encrypt(encrypted.fecha_nacimiento);
    return encrypted;
  }

  private decryptData(data: any) {
    if (!data) return data;
    const decrypted = { ...data };
    if (decrypted.dni) decrypted.dni = this.cryptoService.decrypt(decrypted.dni);
    if (decrypted.cuil) decrypted.cuil = this.cryptoService.decrypt(decrypted.cuil);
    if (decrypted.fecha_nacimiento) decrypted.fecha_nacimiento = this.cryptoService.decrypt(decrypted.fecha_nacimiento);
    return decrypted;
  }

  async create(createStudentDto: CreateStudentDto) {
    let { id_estado, id_motivo_baja, ...rest } = createStudentDto;
    
    // Regla de Negocio: Validar estado BAJA y REGULAR
    if (id_estado === 2) {
      if (!id_motivo_baja) {
        throw new BadRequestException('El motivo de baja es obligatorio cuando el estado es BAJA.');
      }
    } else if (id_estado === 1) {
      id_motivo_baja = null as any; 
    }

    await this.checkDuplicates(createStudentDto.dni, createStudentDto.cuil);

    const data: any = {
      ...rest,
      id_estado,
      id_motivo_baja,
    };

    const dataToSave = this.encryptData(data);

    const student = await this.prisma.alumno.create({ data: dataToSave });
    return this.calculateAge(this.decryptData(student));
  }

  async findAll() {
    const students = await this.prisma.alumno.findMany();
    return students.map((s: any) => this.calculateAge(this.decryptData(s)));
  }

  async findOne(id: number) {
    const student = await this.prisma.alumno.findUnique({
      where: { id_alumno: id },
    });
    if (!student) return null;
    return this.calculateAge(this.decryptData(student));
  }

  async update(id: number, updateStudentDto: UpdateStudentDto) {
    let { id_estado, id_motivo_baja, ...rest } = updateStudentDto;

    const currentStudent = await this.prisma.alumno.findUnique({ where: { id_alumno: id } });
    if (!currentStudent) throw new BadRequestException('Estudiante no encontrado');

    const decryptedCurrent = this.decryptData(currentStudent);

    await this.checkDuplicates(
      updateStudentDto.dni || decryptedCurrent.dni, 
      (updateStudentDto as any).cuil || decryptedCurrent.cuil, 
      id
    );

    const finalEstado = id_estado ?? currentStudent.id_estado;
    let finalMotivo = id_motivo_baja ?? currentStudent.id_motivo_baja;

    if (finalEstado === 2) {
      if (!finalMotivo) throw new BadRequestException('El motivo de baja es obligatorio cuando el estado es BAJA.');
    } else if (finalEstado === 1) {
      finalMotivo = null;
    }

    const data: any = { ...rest, id_estado: finalEstado, id_motivo_baja: finalMotivo };
    
    const dataToSave = this.encryptData(data);

    const updated = await this.prisma.alumno.update({
      where: { id_alumno: id },
      data: dataToSave,
    });
    return this.calculateAge(this.decryptData(updated));
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
