import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from '../prisma/prisma.service';
import { MailerService } from '@nestjs-modules/mailer';
import { CryptoService } from '../crypto/crypto.service';

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);

  constructor(
    private prisma: PrismaService,
    private mailerService: MailerService,
    private cryptoService: CryptoService
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async checkCierreNotas() {
    const config = await this.prisma.configuracionAlertas.findUnique({ where: { tipo_alerta: 'CIERRE_NOTAS' } });
    if (config && !config.activa) return;

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
    const alertDays = (config?.parametros as any)?.dias_anticipacion || [7, 1];

    for (const evento of eventos) {
      if (evento.fecha_inicio) {
        const diffTime = evento.fecha_inicio.getTime() - hoy.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (alertDays.includes(diffDays)) {
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

            // Enviar email a todos los profesores
            const profes = await this.prisma.usuario.findMany({
              where: { id_rol: rolProfesor.id_rol, id_personal: { not: null } },
              include: { personal: true }
            });
            for (const profe of profes) {
              if (profe.personal?.mail_abc) {
                const mail = this.cryptoService.decrypt(profe.personal.mail_abc);
                await this.sendEmail(mail, `Alerta: Cierre de Notas en ${diffDays} días`, `El evento "${evento.evento}" está programado para el ${evento.fecha_inicio.toLocaleDateString()}.`);
              }
            }
          }
        }
      }
    }
  }

  @Cron(CronExpression.EVERY_WEEK)
  async checkInasistencias() {
    const config = await this.prisma.configuracionAlertas.findUnique({ where: { tipo_alerta: 'RECORDATORIO_FALTAS' } });
    if (config && !config.activa) return;

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
      // Similar loop for preceptores could be added here
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

  async createAndSend(id_usuario: number, titulo: string, mensaje: string, tipo: string = 'INFORMATIVO') {
    const notificacion = await this.prisma.notificacion.create({
      data: { id_usuario, titulo, mensaje, tipo }
    });

    const user = await this.prisma.usuario.findUnique({
      where: { id_usuario },
      include: { personal: true }
    });

    if (user?.personal?.mail_abc) {
      const mail = this.cryptoService.decrypt(user.personal.mail_abc);
      await this.sendEmail(mail, titulo, mensaje);
    }
    return notificacion;
  }

  private async sendEmail(to: string, subject: string, text: string) {
    try {
      await this.mailerService.sendMail({
        to,
        subject,
        text,
      });
    } catch (e) {
      this.logger.error(`Failed to send email to ${to}`, e);
    }
  }
}
