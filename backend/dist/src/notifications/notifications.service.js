"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var NotificationsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationsService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const prisma_service_1 = require("../prisma/prisma.service");
const mailer_1 = require("@nestjs-modules/mailer");
const crypto_service_1 = require("../crypto/crypto.service");
let NotificationsService = NotificationsService_1 = class NotificationsService {
    constructor(prisma, mailerService, cryptoService) {
        this.prisma = prisma;
        this.mailerService = mailerService;
        this.cryptoService = cryptoService;
        this.logger = new common_1.Logger(NotificationsService_1.name);
    }
    async checkCierreNotas() {
        const config = await this.prisma.configuracionAlertas.findUnique({ where: { tipo_alerta: 'CIERRE_NOTAS' } });
        if (config && !config.activa)
            return;
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
        const alertDays = config?.parametros?.dias_anticipacion || [7, 1];
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
    async checkInasistencias() {
        const config = await this.prisma.configuracionAlertas.findUnique({ where: { tipo_alerta: 'RECORDATORIO_FALTAS' } });
        if (config && !config.activa)
            return;
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
    findAll() {
        return this.prisma.notificacion.findMany({
            orderBy: { fecha_creacion: 'desc' }
        });
    }
    findOne(id) {
        return this.prisma.notificacion.findUnique({
            where: { id_notificacion: id }
        });
    }
    async markAsRead(id) {
        return this.prisma.notificacion.update({
            where: { id_notificacion: id },
            data: { leida: true }
        });
    }
    async createAndSend(id_usuario, titulo, mensaje, tipo = 'INFORMATIVO') {
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
    async sendEmail(to, subject, text) {
        try {
            await this.mailerService.sendMail({
                to,
                subject,
                text,
            });
        }
        catch (e) {
            this.logger.error(`Failed to send email to ${to}`, e);
        }
    }
};
exports.NotificationsService = NotificationsService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_DAY_AT_MIDNIGHT),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NotificationsService.prototype, "checkCierreNotas", null);
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_WEEK),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NotificationsService.prototype, "checkInasistencias", null);
exports.NotificationsService = NotificationsService = NotificationsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        mailer_1.MailerService,
        crypto_service_1.CryptoService])
], NotificationsService);
//# sourceMappingURL=notifications.service.js.map