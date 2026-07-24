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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssignmentsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const crypto_service_1 = require("../crypto/crypto.service");
const notifications_service_1 = require("../notifications/notifications.service");
let AssignmentsService = class AssignmentsService {
    constructor(prisma, cryptoService, notificationsService) {
        this.prisma = prisma;
        this.cryptoService = cryptoService;
        this.notificationsService = notificationsService;
    }
    async create(createAssignmentDto) {
        const { id_situacion_revista, cuil_profesor_reemplazado, nota_desempeno, fundamentacion_baja_nota, id_personal, id_materia, ...rest } = createAssignmentDto;
        const cuilReemplazado = id_situacion_revista === 3 ? cuil_profesor_reemplazado : null;
        if (id_situacion_revista === 3 && !cuilReemplazado) {
            throw new common_1.BadRequestException('El CUIL del profesor reemplazado es obligatorio para suplencias');
        }
        const data = {
            ...rest,
            id_personal,
            id_materia,
            id_situacion_revista,
            cuil_profesor_reemplazado: cuilReemplazado ? this.cryptoService.encrypt(cuilReemplazado) : null,
            nota_desempeno: nota_desempeno ?? null,
            fundamentacion_baja_nota: (nota_desempeno !== null && nota_desempeno !== undefined && nota_desempeno < 6) ? fundamentacion_baja_nota : null,
        };
        if (nota_desempeno !== undefined && nota_desempeno !== null) {
            if (nota_desempeno < 1 || nota_desempeno > 10) {
                throw new common_1.BadRequestException('La nota de desempeño debe estar entre 1.00 y 10.00');
            }
            if (nota_desempeno < 6 && !data.fundamentacion_baja_nota) {
                throw new common_1.BadRequestException('En caso de que el agente calificador asignara nota inferior a 6 puntos, deberá fundamentar en hoja aparte.');
            }
        }
        if (data.fecha_posesion)
            data.fecha_posesion = new Date(data.fecha_posesion);
        if (data.fecha_cese)
            data.fecha_cese = new Date(data.fecha_cese);
        if (data.fecha_posesion)
            data.fecha_posesion = new Date(data.fecha_posesion);
        if (data.fecha_cese)
            data.fecha_cese = new Date(data.fecha_cese);
        const created = await this.prisma.designacion.create({ data });
        const usuarioAsignado = await this.prisma.usuario.findFirst({
            where: { id_personal: created.id_personal }
        });
        if (usuarioAsignado) {
            await this.notificationsService.createAndSend(usuarioAsignado.id_usuario, 'Nueva Asignación de Materia', `Se le ha asignado una nueva materia. Fecha de posesión: ${created.fecha_posesion?.toLocaleDateString()}`);
        }
        if (created.cuil_profesor_reemplazado) {
            created.cuil_profesor_reemplazado = this.cryptoService.decrypt(created.cuil_profesor_reemplazado);
        }
        return created;
    }
    async findAll() {
        const designaciones = await this.prisma.designacion.findMany();
        return designaciones.map(d => {
            if (d.cuil_profesor_reemplazado)
                d.cuil_profesor_reemplazado = this.cryptoService.decrypt(d.cuil_profesor_reemplazado);
            return d;
        });
    }
    async findOne(id) {
        const designacion = await this.prisma.designacion.findUnique({
            where: { id_designacion: id },
        });
        if (designacion && designacion.cuil_profesor_reemplazado) {
            designacion.cuil_profesor_reemplazado = this.cryptoService.decrypt(designacion.cuil_profesor_reemplazado);
        }
        return designacion;
    }
    async update(id, updateAssignmentDto) {
        const current = await this.prisma.designacion.findUnique({ where: { id_designacion: id } });
        if (!current)
            throw new common_1.NotFoundException('Designación no encontrada');
        let finalSit = updateAssignmentDto.id_situacion_revista ?? current.id_situacion_revista;
        let finalCuil = null;
        if (updateAssignmentDto.cuil_profesor_reemplazado !== undefined) {
            finalCuil = updateAssignmentDto.cuil_profesor_reemplazado;
        }
        else if (current.cuil_profesor_reemplazado) {
            finalCuil = this.cryptoService.decrypt(current.cuil_profesor_reemplazado);
        }
        let finalNota = (updateAssignmentDto.nota_desempeno !== undefined) ? updateAssignmentDto.nota_desempeno : current.nota_desempeno;
        let finalFundamentacion = (updateAssignmentDto.fundamentacion_baja_nota !== undefined) ? updateAssignmentDto.fundamentacion_baja_nota : current.fundamentacion_baja_nota;
        if (finalSit !== 3) {
            finalCuil = null;
        }
        else {
            if (!finalCuil)
                throw new common_1.BadRequestException('El CUIL del profesor reemplazado es obligatorio para suplencias');
        }
        if (finalNota !== null && finalNota !== undefined) {
            const notaNum = Number(finalNota);
            if (notaNum < 6 && !finalFundamentacion) {
                throw new common_1.BadRequestException('En caso de que el agente calificador asignara nota inferior a 6 puntos, deberá fundamentar en hoja aparte.');
            }
            if (notaNum >= 6) {
                finalFundamentacion = null;
            }
        }
        const data = {
            ...updateAssignmentDto,
            id_situacion_revista: finalSit,
            cuil_profesor_reemplazado: finalCuil ? this.cryptoService.encrypt(finalCuil) : null,
            nota_desempeno: finalNota,
            fundamentacion_baja_nota: finalFundamentacion,
        };
        if (data.fecha_posesion)
            data.fecha_posesion = new Date(data.fecha_posesion);
        if (data.fecha_cese)
            data.fecha_cese = new Date(data.fecha_cese);
        const updated = await this.prisma.designacion.update({
            where: { id_designacion: id },
            data,
        });
        if (updated.cuil_profesor_reemplazado) {
            updated.cuil_profesor_reemplazado = this.cryptoService.decrypt(updated.cuil_profesor_reemplazado);
        }
        return updated;
    }
};
exports.AssignmentsService = AssignmentsService;
exports.AssignmentsService = AssignmentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        crypto_service_1.CryptoService,
        notifications_service_1.NotificationsService])
], AssignmentsService);
//# sourceMappingURL=assignments.service.js.map