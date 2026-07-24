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
const crypto_service_1 = require("../crypto/crypto.service");
let TeachersService = class TeachersService {
    constructor(prisma, cryptoService) {
        this.prisma = prisma;
        this.cryptoService = cryptoService;
    }
    async checkDuplicates(dni, cuil, idToIgnore) {
        const allPersonal = await this.prisma.personalDocente.findMany();
        for (const person of allPersonal) {
            if (idToIgnore && person.id_personal === idToIgnore)
                continue;
            if (person.dni === dni) {
                throw new common_1.ConflictException(`El DNI ${dni} ya está registrado`);
            }
            const decryptedCuil = this.cryptoService.decrypt(person.cuil);
            if (decryptedCuil === cuil) {
                throw new common_1.ConflictException(`El CUIL ${cuil} ya está registrado`);
            }
        }
    }
    encryptData(data) {
        const encrypted = { ...data };
        if (encrypted.cuil)
            encrypted.cuil = this.cryptoService.encrypt(encrypted.cuil);
        if (encrypted.fecha_nacimiento)
            encrypted.fecha_nacimiento = this.cryptoService.encrypt(encrypted.fecha_nacimiento);
        if (encrypted.direccion)
            encrypted.direccion = this.cryptoService.encrypt(encrypted.direccion);
        if (encrypted.localidad)
            encrypted.localidad = this.cryptoService.encrypt(encrypted.localidad);
        if (encrypted.mail_personal)
            encrypted.mail_personal = this.cryptoService.encrypt(encrypted.mail_personal);
        if (encrypted.mail_abc)
            encrypted.mail_abc = this.cryptoService.encrypt(encrypted.mail_abc);
        if (encrypted.telefono)
            encrypted.telefono = this.cryptoService.encrypt(encrypted.telefono);
        return encrypted;
    }
    decryptData(data) {
        if (!data)
            return data;
        const decrypted = { ...data };
        if (decrypted.cuil)
            decrypted.cuil = this.cryptoService.decrypt(decrypted.cuil);
        if (decrypted.fecha_nacimiento)
            decrypted.fecha_nacimiento = this.cryptoService.decrypt(decrypted.fecha_nacimiento);
        if (decrypted.direccion)
            decrypted.direccion = this.cryptoService.decrypt(decrypted.direccion);
        if (decrypted.localidad)
            decrypted.localidad = this.cryptoService.decrypt(decrypted.localidad);
        if (decrypted.mail_personal)
            decrypted.mail_personal = this.cryptoService.decrypt(decrypted.mail_personal);
        if (decrypted.mail_abc)
            decrypted.mail_abc = this.cryptoService.decrypt(decrypted.mail_abc);
        if (decrypted.telefono)
            decrypted.telefono = this.cryptoService.decrypt(decrypted.telefono);
        return decrypted;
    }
    async create(createTeacherDto) {
        await this.checkDuplicates(createTeacherDto.dni, createTeacherDto.cuil);
        const dataToSave = this.encryptData(createTeacherDto);
        const result = await this.prisma.personalDocente.create({ data: dataToSave });
        return this.decryptData(result);
    }
    async findAll() {
        const all = await this.prisma.personalDocente.findMany();
        return all.map(p => this.decryptData(p));
    }
    async findOne(id) {
        const teacher = await this.prisma.personalDocente.findUnique({
            where: { id_personal: id },
            include: { inasistencias: true },
        });
        if (!teacher)
            throw new common_1.NotFoundException('Personal docente no encontrado');
        const totalFaltas = teacher.inasistencias?.length || 0;
        return { ...this.decryptData(teacher), estadistica_faltas_totales: totalFaltas };
    }
    async update(id, updateTeacherDto) {
        if (updateTeacherDto.dni || updateTeacherDto.cuil) {
            const existing = await this.prisma.personalDocente.findUnique({ where: { id_personal: id } });
            if (!existing)
                throw new common_1.NotFoundException('Personal docente no encontrado');
            await this.checkDuplicates(updateTeacherDto.dni || existing.dni, updateTeacherDto.cuil || this.cryptoService.decrypt(existing.cuil), id);
        }
        const dataToSave = this.encryptData(updateTeacherDto);
        const result = await this.prisma.personalDocente.update({
            where: { id_personal: id },
            data: dataToSave,
        });
        return this.decryptData(result);
    }
    async addAbsence(id, createAbsenceDto) {
        return this.prisma.inasistenciasDiariasDocentes.create({
            data: {
                id_personal: id,
                ...createAbsenceDto,
                fecha: new Date(),
            },
        });
    }
};
exports.TeachersService = TeachersService;
exports.TeachersService = TeachersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        crypto_service_1.CryptoService])
], TeachersService);
//# sourceMappingURL=teachers.service.js.map