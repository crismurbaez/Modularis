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
exports.TeachersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let TeachersService = class TeachersService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createTeacherDto) {
        const data = { ...createTeacherDto };
        if (data.fecha_nacimiento)
            data.fecha_nacimiento = new Date(data.fecha_nacimiento);
        return this.prisma.extended.profesor.create({ data });
    }
    findAll() {
        return this.prisma.extended.profesor.findMany();
    }
    async findOne(id) {
        const teacher = await this.prisma.extended.profesor.findUnique({
            where: { id_profesor: id },
            include: { inasistencias_docentes: true },
        });
        if (!teacher)
            throw new common_1.NotFoundException('Docente no encontrado');
        const totalFaltas = teacher.inasistencias_docentes.reduce((acc, curr) => {
            return acc + (curr.faltas_enfermedad || 0)
                + (curr.faltas_causas_priv || 0)
                + (curr.faltas_otras_causas || 0)
                + (curr.faltas_injustificadas || 0);
        }, 0);
        return { ...teacher, estadistica_faltas_totales: totalFaltas };
    }
    async update(id, updateTeacherDto) {
        const data = { ...updateTeacherDto };
        if (data.fecha_nacimiento)
            data.fecha_nacimiento = new Date(data.fecha_nacimiento);
        return this.prisma.extended.profesor.update({
            where: { id_profesor: id },
            data,
        });
    }
    async addAbsence(id, createAbsenceDto) {
        return this.prisma.extended.inasistenciaDocente.create({
            data: {
                id_profesor: id,
                ...createAbsenceDto,
            },
        });
    }
};
exports.TeachersService = TeachersService;
exports.TeachersService = TeachersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TeachersService);
//# sourceMappingURL=teachers.service.js.map