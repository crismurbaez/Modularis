import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ConfigAlertasService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.configuracionAlertas.findMany();
  }

  findOne(tipo_alerta: string) {
    return this.prisma.configuracionAlertas.findUnique({
      where: { tipo_alerta }
    });
  }

  async upsert(tipo_alerta: string, activa: boolean, parametros: any) {
    return this.prisma.configuracionAlertas.upsert({
      where: { tipo_alerta },
      update: { activa, parametros },
      create: { tipo_alerta, activa, parametros }
    });
  }
}
