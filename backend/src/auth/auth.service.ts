import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login(dni: string, pass: string) {
    const user = await this.prisma.usuario.findUnique({
      where: { dni },
      include: {
        rol: {
          include: {
            permisos: {
              include: {
                permiso: true
              }
            }
          }
        }
      }
    });

    if (!user || !user.activo) {
      throw new UnauthorizedException('Credenciales inválidas o usuario inactivo');
    }

    const isMatch = await bcrypt.compare(pass, user.password_hash);
    if (!isMatch) {
      throw new UnauthorizedException('Credenciales inválidas o usuario inactivo');
    }

    // Extraer los códigos de permisos
    const permissions = user.rol.permisos.map(rp => rp.permiso.codigo);

    const payload = { 
      sub: user.id_usuario, 
      dni: user.dni,
      rol: user.rol.nombre,
      permisos: permissions,
      id_profesor: user.id_profesor
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
      user: {
        nombre: user.nombre,
        apellido: user.apellido,
        rol: user.rol.nombre,
        permisos: permissions
      }
    };
  }
}
