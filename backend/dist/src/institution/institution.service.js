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
exports.InstitutionService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let InstitutionService = class InstitutionService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createOrUpdate(createInstitutionDto, files) {
        const data = { ...createInstitutionDto };
        if (files?.icono) {
            data.icono = files.icono[0].filename;
        }
        if (files?.imagen_sello) {
            data.imagen_sello = files.imagen_sello[0].filename;
        }
        const existing = await this.prisma.datosInstitucion.findFirst();
        if (existing) {
            return this.prisma.datosInstitucion.update({
                where: { id_datos: existing.id_datos },
                data,
            });
        }
        else {
            return this.prisma.datosInstitucion.create({
                data,
            });
        }
    }
    findOne() {
        return this.prisma.datosInstitucion.findFirst();
    }
};
exports.InstitutionService = InstitutionService;
exports.InstitutionService = InstitutionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], InstitutionService);
//# sourceMappingURL=institution.service.js.map