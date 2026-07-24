import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.usuario.findMany({
      where: {
        rol: { nombre: { not: 'SUPERADMIN' } }
      },
      select: {
        id_usuario: true,
        username: true,
        activo: true,
        rol: true,
        personal: true,
      },
    });
  }

  async findOne(id: number) {
    const user = await this.prisma.usuario.findUnique({
      where: { id_usuario: id },
      include: { rol: true, personal: true },
    });
    if (!user || user.rol.nombre === 'SUPERADMIN') throw new NotFoundException('Usuario no encontrado');
    return user;
  }

  async create(data: any) {
    const existing = await this.prisma.usuario.findUnique({ where: { username: data.username } });
    if (existing) throw new ConflictException('El usuario ya está registrado');

    const hashedPassword = await bcrypt.hash(data.password, 10);

    return this.prisma.usuario.create({
      data: {
        username: data.username,
        password_hash: hashedPassword,
        id_rol: data.id_rol,
        id_personal: data.id_personal,
        activo: true,
      },
      select: { id_usuario: true, username: true, rol: true, personal: true }
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
