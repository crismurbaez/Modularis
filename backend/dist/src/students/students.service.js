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
exports.StudentsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let StudentsService = class StudentsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createStudentDto) {
        let { id_estado, id_motivo_baja, fecha_nacimiento, ...rest } = createStudentDto;
        if (id_estado === 2) {
            if (!id_motivo_baja) {
                throw new common_1.BadRequestException('El motivo de baja es obligatorio cuando el estado es BAJA.');
            }
        }
        else if (id_estado === 1) {
            id_motivo_baja = null;
        }
        const data = {
            ...rest,
            id_estado,
            id_motivo_baja,
        };
        if (fecha_nacimiento) {
            data.fecha_nacimiento = new Date(fecha_nacimiento);
        }
        const student = await this.prisma.extended.alumno.create({ data });
        return this.calculateAge(student);
    }
    async findAll() {
        const students = await this.prisma.extended.alumno.findMany();
        return students.map((s) => this.calculateAge(s));
    }
    async findOne(id) {
        const student = await this.prisma.extended.alumno.findUnique({
            where: { id_alumno: id },
        });
        if (!student)
            return null;
        return this.calculateAge(student);
    }
    async update(id, updateStudentDto) {
        let { id_estado, id_motivo_baja, fecha_nacimiento, ...rest } = updateStudentDto;
        const currentStudent = await this.prisma.extended.alumno.findUnique({ where: { id_alumno: id } });
        if (!currentStudent)
            throw new common_1.BadRequestException('Estudiante no encontrado');
        const finalEstado = id_estado ?? currentStudent.id_estado;
        let finalMotivo = id_motivo_baja ?? currentStudent.id_motivo_baja;
        if (finalEstado === 2) {
            if (!finalMotivo)
                throw new common_1.BadRequestException('El motivo de baja es obligatorio cuando el estado es BAJA.');
        }
        else if (finalEstado === 1) {
            finalMotivo = null;
        }
        const data = { ...rest, id_estado: finalEstado, id_motivo_baja: finalMotivo };
        if (fecha_nacimiento)
            data.fecha_nacimiento = new Date(fecha_nacimiento);
        const updated = await this.prisma.extended.alumno.update({
            where: { id_alumno: id },
            data,
        });
        return this.calculateAge(updated);
    }
    calculateAge(student) {
        if (student.fecha_nacimiento) {
            const today = new Date();
            const birthDate = new Date(student.fecha_nacimiento);
            let age = today.getFullYear() - birthDate.getFullYear();
            const m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            student.edad = age;
        }
        return student;
    }
};
exports.StudentsService = StudentsService;
exports.StudentsService = StudentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], StudentsService);
//# sourceMappingURL=students.service.js.map