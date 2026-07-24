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
exports.AttendanceService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let AttendanceService = class AttendanceService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async registerBulk(bulkData) {
        const { id_curso_seccion, fecha, id_usuario, ausentes } = bulkData;
        const estado = await this.prisma.estadoAsistenciaCurso.create({
            data: {
                id_curso_seccion,
                fecha: new Date(fecha),
                id_usuario
            }
        });
        if (ausentes && ausentes.length > 0) {
            const faltas = ausentes.map((a) => ({
                id_alumno: a.id_alumno,
                fecha: new Date(fecha),
                id_causa: a.id_causa,
                observaciones: a.observaciones
            }));
            await this.prisma.inasistenciaAlumno.createMany({
                data: faltas,
                skipDuplicates: true
            });
        }
        return { success: true, estado };
    }
    async getCalendar(month, year) {
        const start = new Date(`${year}-${month.padStart(2, '0')}-01`);
        const end = new Date(start.getFullYear(), start.getMonth() + 1, 0);
        return this.prisma.calendarioAcademico.findMany({
            where: {
                fecha_inicio: { gte: start, lte: end }
            }
        });
    }
};
exports.AttendanceService = AttendanceService;
exports.AttendanceService = AttendanceService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AttendanceService);
//# sourceMappingURL=attendance.service.js.map