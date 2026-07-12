import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.usuario.findMany({
      select: {
        id_usuario: true,
        dni: true,
        nombre: true,
        apellido: true,
        activo: true,
        rol: true,
        profesor: true,
      },
    });
  }

  async findOne(id: number) {
    const user = await this.prisma.usuario.findUnique({
      where: { id_usuario: id },
      include: { rol: true, profesor: true },
    });
    if (!user) throw new NotFoundException('Usuario no encontrado');
    return user;
  }

  async create(data: any) {
    const existing = await this.prisma.usuario.findUnique({ where: { dni: data.dni } });
    if (existing) throw new ConflictException('El DNI ya está registrado');

    const hashedPassword = await bcrypt.hash(data.password, 10);

    return this.prisma.usuario.create({
      data: {
        dni: data.dni,
        password_hash: hashedPassword,
        nombre: data.nombre,
        apellido: data.apellido,
        id_rol: data.id_rol,
        id_profesor: data.id_profesor,
        activo: true,
      },
      select: { id_usuario: true, dni: true, nombre: true, apellido: true }
    });
  }

  async updateStatus(id: number, activo: boolean) {
    return this.prisma.usuario.update({
      where: { id_usuario: id },
      data: { activo },
      select: { id_usuario: true, activo: true }
    });
  }

  async updateRole(id: number, id_rol: number) {
    return this.prisma.usuario.update({
      where: { id_usuario: id },
      data: { id_rol },
      select: { id_usuario: true, rol: true }
    });
  }
}
