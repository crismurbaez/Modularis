import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  private cryptoKey: string;

  constructor(private readonly prisma: PrismaService) {
    this.cryptoKey = process.env.CRYPTO_KEY || 'default_key';
  }

  async findAll() {
    return this.prisma.$transaction(async (tx) => {
      await tx.$executeRawUnsafe(`SET LOCAL app.crypto_key = '${this.cryptoKey}';`);
      return tx.usuario.findMany({
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
    });
  }

  async findOne(id: number) {
    return this.prisma.$transaction(async (tx) => {
      await tx.$executeRawUnsafe(`SET LOCAL app.crypto_key = '${this.cryptoKey}';`);
      const user = await tx.usuario.findUnique({
        where: { id_usuario: id },
        include: { rol: true, personal: true },
      });
      if (!user || user.rol.nombre === 'SUPERADMIN') throw new NotFoundException('Usuario no encontrado');
      return user;
    });
  }

  async create(data: any) {
    return this.prisma.$transaction(async (tx) => {
      await tx.$executeRawUnsafe(`SET LOCAL app.crypto_key = '${this.cryptoKey}';`);
      const existing = await tx.usuario.findUnique({ where: { username: data.username } });
      if (existing) throw new ConflictException('El usuario ya está registrado');

      if (data.id_personal) {
        const existingPersonal = await tx.usuario.findFirst({ where: { id_personal: data.id_personal } });
        if (existingPersonal) throw new ConflictException('Ya existe un usuario asociado a este personal docente');
      }

      const hashedPassword = await bcrypt.hash(data.password, 10);

      return tx.usuario.create({
        data: {
          username: data.username,
          password_hash: hashedPassword,
          id_rol: data.id_rol,
          id_personal: data.id_personal,
          activo: true,
        },
        select: { id_usuario: true, username: true, rol: true, personal: true }
      });
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

