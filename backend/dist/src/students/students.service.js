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
        this.cryptoKey = process.env.CRYPTO_KEY || 'default_key';
    }
    async checkDuplicates(tx, dni, cuil, idToIgnore) {
        const whereClause = { OR: [{ dni }, { cuil }] };
        if (idToIgnore) {
            whereClause.NOT = { id_alumno: idToIgnore };
        }
        const existing = await tx.alumno.findFirst({ where: whereClause });
        if (existing) {
            if (existing.dni === dni)
                throw new common_1.ConflictException(`El DNI ${dni} ya está registrado`);
            if (existing.cuil === cuil)
                throw new common_1.ConflictException(`El CUIL ${cuil} ya está registrado`);
        }
    }
    async create(createStudentDto) {
        return this.prisma.$transaction(async (tx) => {
            await tx.$executeRawUnsafe(`SET LOCAL app.crypto_key = '${this.cryptoKey}';`);
            let { id_estado, id_motivo_baja, ...rest } = createStudentDto;
            if (id_estado === 2) {
                if (!id_motivo_baja) {
                    throw new common_1.BadRequestException('El motivo de baja es obligatorio cuando el estado es BAJA.');
                }
            }
            else if (id_estado === 1) {
                id_motivo_baja = null;
            }
            await this.checkDuplicates(tx, createStudentDto.dni, createStudentDto.cuil);
            const data = {
                ...rest,
                id_estado,
                id_motivo_baja,
            };
            const student = await tx.alumno.create({ data });
            return this.calculateAge(student);
        });
    }
    async findAll() {
        return this.prisma.$transaction(async (tx) => {
            await tx.$executeRawUnsafe(`SET LOCAL app.crypto_key = '${this.cryptoKey}';`);
            const students = await tx.alumno.findMany();
            return students.map((s) => this.calculateAge(s));
        });
    }
    async findOne(id) {
        return this.prisma.$transaction(async (tx) => {
            await tx.$executeRawUnsafe(`SET LOCAL app.crypto_key = '${this.cryptoKey}';`);
            const student = await tx.alumno.findUnique({
                where: { id_alumno: id },
            });
            if (!student)
                return null;
            return this.calculateAge(student);
        });
    }
    async update(id, updateStudentDto) {
        return this.prisma.$transaction(async (tx) => {
            await tx.$executeRawUnsafe(`SET LOCAL app.crypto_key = '${this.cryptoKey}';`);
            let { id_estado, id_motivo_baja, ...rest } = updateStudentDto;
            const currentStudent = await tx.alumno.findUnique({ where: { id_alumno: id } });
            if (!currentStudent)
                throw new common_1.BadRequestException('Estudiante no encontrado');
            if (updateStudentDto.dni || updateStudentDto.cuil) {
                await this.checkDuplicates(tx, updateStudentDto.dni || currentStudent.dni, updateStudentDto.cuil || currentStudent.cuil, id);
            }
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
            const updated = await tx.alumno.update({
                where: { id_alumno: id },
                data: data,
            });
            return this.calculateAge(updated);
        });
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