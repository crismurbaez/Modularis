import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { CreateAbsenceDto } from './dto/create-absence.dto';
import { PrismaService } from '../prisma/prisma.service';
import { CryptoService } from '../crypto/crypto.service';

@Injectable()
export class TeachersService {
  constructor(
    private prisma: PrismaService,
    private cryptoService: CryptoService
  ) {}

  async checkDuplicates(dni: string, cuil: string, idToIgnore?: number) {
    const allPersonal = await this.prisma.personalDocente.findMany();
    for (const person of allPersonal) {
      if (idToIgnore && person.id_personal === idToIgnore) continue;
      if (person.dni === dni) {
        throw new ConflictException(`El DNI ${dni} ya está registrado`);
      }
      const decryptedCuil = this.cryptoService.decrypt(person.cuil);
      if (decryptedCuil === cuil) {
        throw new ConflictException(`El CUIL ${cuil} ya está registrado`);
      }
    }
  }

  private encryptData(data: any) {
    const encrypted = { ...data };
    if (encrypted.cuil) encrypted.cuil = this.cryptoService.encrypt(encrypted.cuil);
    if (encrypted.fecha_nacimiento) encrypted.fecha_nacimiento = this.cryptoService.encrypt(encrypted.fecha_nacimiento);
    if (encrypted.direccion) encrypted.direccion = this.cryptoService.encrypt(encrypted.direccion);
    if (encrypted.localidad) encrypted.localidad = this.cryptoService.encrypt(encrypted.localidad);
    if (encrypted.mail_personal) encrypted.mail_personal = this.cryptoService.encrypt(encrypted.mail_personal);
    if (encrypted.mail_abc) encrypted.mail_abc = this.cryptoService.encrypt(encrypted.mail_abc);
    if (encrypted.telefono) encrypted.telefono = this.cryptoService.encrypt(encrypted.telefono);
    return encrypted;
  }

  private decryptData(data: any) {
    if (!data) return data;
    const decrypted = { ...data };
    if (decrypted.cuil) decrypted.cuil = this.cryptoService.decrypt(decrypted.cuil);
    if (decrypted.fecha_nacimiento) decrypted.fecha_nacimiento = this.cryptoService.decrypt(decrypted.fecha_nacimiento);
    if (decrypted.direccion) decrypted.direccion = this.cryptoService.decrypt(decrypted.direccion);
    if (decrypted.localidad) decrypted.localidad = this.cryptoService.decrypt(decrypted.localidad);
    if (decrypted.mail_personal) decrypted.mail_personal = this.cryptoService.decrypt(decrypted.mail_personal);
    if (decrypted.mail_abc) decrypted.mail_abc = this.cryptoService.decrypt(decrypted.mail_abc);
    if (decrypted.telefono) decrypted.telefono = this.cryptoService.decrypt(decrypted.telefono);
    return decrypted;
  }

  async create(createTeacherDto: CreateTeacherDto) {
    await this.checkDuplicates(createTeacherDto.dni, createTeacherDto.cuil);
    const dataToSave = this.encryptData(createTeacherDto);
    const result = await this.prisma.personalDocente.create({ data: dataToSave });
    return this.decryptData(result);
  }

  async findAll() {
    const all = await this.prisma.personalDocente.findMany();
    return all.map(p => this.decryptData(p));
  }

  async findOne(id: number) {
    const teacher = await this.prisma.personalDocente.findUnique({
      where: { id_personal: id },
      include: { inasistencias: true },
    });
    
    if (!teacher) throw new NotFoundException('Personal docente no encontrado');

    // Regla de Negocio: Control Estadístico de Inasistencias (S.E.T. 4 Punto 1.14)
    // Nota: Como la estructura de inasistencias cambió a inasistencias_diarias_docentes, esto se ajustará
    // temporalmente devolvemos el largo o un placeholder.
    const totalFaltas = teacher.inasistencias?.length || 0;

    return { ...this.decryptData(teacher), estadistica_faltas_totales: totalFaltas };
  }

  async update(id: number, updateTeacherDto: UpdateTeacherDto) {
    if (updateTeacherDto.dni || updateTeacherDto.cuil) {
      const existing = await this.prisma.personalDocente.findUnique({ where: { id_personal: id } });
      if (!existing) throw new NotFoundException('Personal docente no encontrado');
      await this.checkDuplicates(
        updateTeacherDto.dni || existing.dni,
        updateTeacherDto.cuil || this.cryptoService.decrypt(existing.cuil),
        id
      );
    }
    
    const dataToSave = this.encryptData(updateTeacherDto);
    const result = await this.prisma.personalDocente.update({
      where: { id_personal: id },
      data: dataToSave,
    });
    return this.decryptData(result);
  }

  async addAbsence(id: number, createAbsenceDto: CreateAbsenceDto) {
    return this.prisma.inasistenciasDiariasDocentes.create({
      data: {
        id_personal: id,
        ...createAbsenceDto,
        fecha: new Date(), // Temporarily assuming today
      },
    });
  }
}
