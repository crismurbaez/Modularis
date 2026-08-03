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
exports.StaffService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let StaffService = class StaffService {
    constructor(prisma) {
        this.prisma = prisma;
        this.cryptoKey = process.env.CRYPTO_KEY || 'default_key';
    }
    async checkDuplicates(tx, dni, cuil, idToIgnore) {
        const whereClause = { OR: [{ dni }, { cuil }] };
        if (idToIgnore) {
            whereClause.NOT = { id_personal: idToIgnore };
        }
        const existing = await tx.personalDocente.findFirst({ where: whereClause });
        if (existing) {
            if (existing.dni === dni)
                throw new common_1.ConflictException(`El DNI ${dni} ya está registrado`);
            if (existing.cuil === cuil)
                throw new common_1.ConflictException(`El CUIL ${cuil} ya está registrado`);
        }
    }
    async create(createStaffDto) {
        return this.prisma.$transaction(async (tx) => {
            await tx.$executeRawUnsafe(`SET LOCAL app.crypto_key = '${this.cryptoKey}';`);
            await this.checkDuplicates(tx, createStaffDto.dni, createStaffDto.cuil);
            const result = await tx.personalDocente.create({ data: createStaffDto });
            return result;
        });
    }
    async findAll() {
        return this.prisma.$transaction(async (tx) => {
            await tx.$executeRawUnsafe(`SET LOCAL app.crypto_key = '${this.cryptoKey}';`);
            return tx.personalDocente.findMany();
        });
    }
    async findOne(id) {
        return this.prisma.$transaction(async (tx) => {
            await tx.$executeRawUnsafe(`SET LOCAL app.crypto_key = '${this.cryptoKey}';`);
            const staff = await tx.personalDocente.findFirst({
                where: { id_personal: id },
                include: { inasistencias: true },
            });
            if (!staff)
                throw new common_1.NotFoundException('Personal docente no encontrado');
            const totalFaltas = staff.inasistencias?.length || 0;
            return { ...staff, estadistica_faltas_totales: totalFaltas };
        });
    }
    async update(id, updateStaffDto) {
        return this.prisma.$transaction(async (tx) => {
            await tx.$executeRawUnsafe(`SET LOCAL app.crypto_key = '${this.cryptoKey}';`);
            const existing = await tx.personalDocente.findFirst({ where: { id_personal: id } });
            if (!existing)
                throw new common_1.NotFoundException('Personal docente no encontrado');
            if (updateStaffDto.dni || updateStaffDto.cuil) {
                await this.checkDuplicates(tx, updateStaffDto.dni || existing.dni, updateStaffDto.cuil || existing.cuil, id);
            }
            const result = await tx.personalDocente.update({
                where: { id_personal: id },
                data: updateStaffDto,
            });
            return result;
        });
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
exports.StaffService = StaffService;
exports.StaffService = StaffService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], StaffService);
//# sourceMappingURL=staff.service.js.map