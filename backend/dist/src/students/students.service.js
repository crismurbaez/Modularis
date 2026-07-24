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
const crypto_service_1 = require("../crypto/crypto.service");
let StudentsService = class StudentsService {
    constructor(prisma, cryptoService) {
        this.prisma = prisma;
        this.cryptoService = cryptoService;
    }
    async checkDuplicates(dni, cuil, idToIgnore) {
        const allStudents = await this.prisma.alumno.findMany();
        for (const student of allStudents) {
            if (idToIgnore && student.id_alumno === idToIgnore)
                continue;
            const decryptedDni = this.cryptoService.decrypt(student.dni);
            if (decryptedDni === dni) {
                throw new common_1.ConflictException(`El DNI ${dni} ya está registrado`);
            }
            const decryptedCuil = this.cryptoService.decrypt(student.cuil);
            if (decryptedCuil === cuil) {
                throw new common_1.ConflictException(`El CUIL ${cuil} ya está registrado`);
            }
        }
    }
    encryptData(data) {
        const encrypted = { ...data };
        if (encrypted.dni)
            encrypted.dni = this.cryptoService.encrypt(encrypted.dni);
        if (encrypted.cuil)
            encrypted.cuil = this.cryptoService.encrypt(encrypted.cuil);
        if (encrypted.fecha_nacimiento)
            encrypted.fecha_nacimiento = this.cryptoService.encrypt(encrypted.fecha_nacimiento);
        return encrypted;
    }
    decryptData(data) {
        if (!data)
            return data;
        const decrypted = { ...data };
        if (decrypted.dni)
            decrypted.dni = this.cryptoService.decrypt(decrypted.dni);
        if (decrypted.cuil)
            decrypted.cuil = this.cryptoService.decrypt(decrypted.cuil);
        if (decrypted.fecha_nacimiento)
            decrypted.fecha_nacimiento = this.cryptoService.decrypt(decrypted.fecha_nacimiento);
        return decrypted;
    }
    async create(createStudentDto) {
        let { id_estado, id_motivo_baja, ...rest } = createStudentDto;
        if (id_estado === 2) {
            if (!id_motivo_baja) {
                throw new common_1.BadRequestException('El motivo de baja es obligatorio cuando el estado es BAJA.');
            }
        }
        else if (id_estado === 1) {
            id_motivo_baja = null;
        }
        await this.checkDuplicates(createStudentDto.dni, createStudentDto.cuil);
        const data = {
            ...rest,
            id_estado,
            id_motivo_baja,
        };
        const dataToSave = this.encryptData(data);
        const student = await this.prisma.alumno.create({ data: dataToSave });
        return this.calculateAge(this.decryptData(student));
    }
    async findAll() {
        const students = await this.prisma.alumno.findMany();
        return students.map((s) => this.calculateAge(this.decryptData(s)));
    }
    async findOne(id) {
        const student = await this.prisma.alumno.findUnique({
            where: { id_alumno: id },
        });
        if (!student)
            return null;
        return this.calculateAge(this.decryptData(student));
    }
    async update(id, updateStudentDto) {
        let { id_estado, id_motivo_baja, ...rest } = updateStudentDto;
        const currentStudent = await this.prisma.alumno.findUnique({ where: { id_alumno: id } });
        if (!currentStudent)
            throw new common_1.BadRequestException('Estudiante no encontrado');
        const decryptedCurrent = this.decryptData(currentStudent);
        await this.checkDuplicates(updateStudentDto.dni || decryptedCurrent.dni, updateStudentDto.cuil || decryptedCurrent.cuil, id);
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
        const dataToSave = this.encryptData(data);
        const updated = await this.prisma.alumno.update({
            where: { id_alumno: id },
            data: dataToSave,
        });
        return this.calculateAge(this.decryptData(updated));
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
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        crypto_service_1.CryptoService])
], StudentsService);
//# sourceMappingURL=students.service.js.map