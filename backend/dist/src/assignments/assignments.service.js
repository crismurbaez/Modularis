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
let AssignmentsService = class AssignmentsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createAssignmentDto) {
        const { id_situacion_revista, cuil_profesor_reemplazado, nota_desempeno, fundamentacion_baja_nota, ...rest } = createAssignmentDto;
        const data = {
            ...rest,
            id_situacion_revista,
            cuil_profesor_reemplazado: id_situacion_revista === 3 ? cuil_profesor_reemplazado : null,
            nota_desempeno: nota_desempeno ?? null,
            fundamentacion_baja_nota: (nota_desempeno !== null && nota_desempeno !== undefined && nota_desempeno < 6) ? fundamentacion_baja_nota : null,
        };
        if (id_situacion_revista === 3 && !data.cuil_profesor_reemplazado) {
            throw new common_1.BadRequestException('El CUIL del profesor reemplazado es obligatorio para suplencias');
        }
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
        return this.prisma.extended.designacion.create({ data });
    }
    findAll() {
        return this.prisma.extended.designacion.findMany();
    }
    findOne(id) {
        return this.prisma.extended.designacion.findUnique({
            where: { id_designacion: id },
        });
    }
    async update(id, updateAssignmentDto) {
        const current = await this.prisma.extended.designacion.findUnique({ where: { id_designacion: id } });
        if (!current)
            throw new common_1.NotFoundException('Designación no encontrada');
        let finalSit = updateAssignmentDto.id_situacion_revista ?? current.id_situacion_revista;
        let finalCuil = (updateAssignmentDto.cuil_profesor_reemplazado !== undefined) ? updateAssignmentDto.cuil_profesor_reemplazado : current.cuil_profesor_reemplazado;
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
            cuil_profesor_reemplazado: finalCuil,
            nota_desempeno: finalNota,
            fundamentacion_baja_nota: finalFundamentacion,
        };
        if (data.fecha_posesion)
            data.fecha_posesion = new Date(data.fecha_posesion);
        if (data.fecha_cese)
            data.fecha_cese = new Date(data.fecha_cese);
        return this.prisma.extended.designacion.update({
            where: { id_designacion: id },
            data,
        });
    }
};
exports.AssignmentsService = AssignmentsService;
exports.AssignmentsService = AssignmentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AssignmentsService);
//# sourceMappingURL=assignments.service.js.map