import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);

  constructor(private prisma: PrismaService) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async checkCierreNotas() {
    this.logger.log('Revisando fechas de cierre de notas cuatrimestrales...');
    
    const eventos = await this.prisma.calendarioAcademico.findMany({
      where: {
        evento: {
          contains: 'cierre',
          mode: 'insensitive'
        }
      }
    });

    const hoy = new Date();

    for (const evento of eventos) {
      if (evento.fecha_inicio) {
        const diffTime = evento.fecha_inicio.getTime() - hoy.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 7 || diffDays === 1) {
          const rolProfesor = await this.prisma.rol.findUnique({ where: { nombre: 'PROFESOR' } });
          if (rolProfesor) {
            await this.prisma.notificacion.create({
              data: {
                id_rol: rolProfesor.id_rol,
                titulo: `Alerta: Cierre de Notas en ${diffDays} días`,
                mensaje: `El evento "${evento.evento}" está programado para el ${evento.fecha_inicio.toLocaleDateString()}. Por favor, complete la carga de notas.`,
                tipo: 'ALERTA'
              }
            });
          }
        }
      }
    }
  }

  @Cron(CronExpression.EVERY_WEEK)
  async checkInasistencias() {
    this.logger.log('Recordatorio semanal de inasistencias en cursadas...');
    const rolPreceptor = await this.prisma.rol.findUnique({ where: { nombre: 'PRECEPTOR' } });
    if (rolPreceptor) {
      await this.prisma.notificacion.create({
        data: {
          id_rol: rolPreceptor.id_rol,
          titulo: 'Recordatorio Semanal',
          mensaje: 'No olvide verificar la carga de inasistencias en Cursadas.',
          tipo: 'RECORDATORIO'
        }
      });
    }
  }

  // API Methods
  findAll() {
    return this.prisma.notificacion.findMany({
      orderBy: { fecha_creacion: 'desc' }
    });
  }

  findOne(id: number) {
    return this.prisma.notificacion.findUnique({
      where: { id_notificacion: id }
    });
  }

  async markAsRead(id: number) {
    return this.prisma.notificacion.update({
      where: { id_notificacion: id },
      data: { leida: true }
    });
  }
}
