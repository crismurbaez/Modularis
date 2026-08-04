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
exports.CatalogsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let CatalogsService = class CatalogsService {
    constructor(prisma) {
        this.prisma = prisma;
        this.allowedCatalogs = [
            'orientacion',
            'cursoSeccion',
            'situacionRevistaDocente',
            'estadoAlumno',
            'motivoBajaAlumno',
            'condicionMateria',
            'causaInasistenciaAlumnos',
            'motivoInasistenciasDocentes',
            'calendarioAcademico'
        ];
    }
    validateCatalog(catalog) {
        if (!this.allowedCatalogs.includes(catalog)) {
            throw new common_1.BadRequestException(`El catálogo '${catalog}' no es válido o no está permitido.`);
        }
    }
    async create(catalog, createCatalogDto) {
        this.validateCatalog(catalog);
        return this.prisma[catalog].create({ data: createCatalogDto });
    }
    async findAll(catalog) {
        this.validateCatalog(catalog);
        return this.prisma[catalog].findMany();
    }
    async findOne(catalog, id) {
        this.validateCatalog(catalog);
        const idField = this.getIdFieldName(catalog);
        const result = await this.prisma[catalog].findFirst({
            where: { [idField]: id }
        });
        if (!result)
            throw new common_1.NotFoundException(`Registro no encontrado en ${catalog}`);
        return result;
    }
    async update(catalog, id, updateCatalogDto) {
        this.validateCatalog(catalog);
        const idField = this.getIdFieldName(catalog);
        await this.findOne(catalog, id);
        return this.prisma[catalog].update({
            where: { [idField]: id },
            data: updateCatalogDto
        });
    }
    async remove(catalog, id) {
        this.validateCatalog(catalog);
        const idField = this.getIdFieldName(catalog);
        await this.findOne(catalog, id);
        return this.prisma[catalog].delete({
            where: { [idField]: id }
        });
    }
    getIdFieldName(catalog) {
        const map = {
            'orientacion': 'id_orientacion',
            'cursoSeccion': 'id_curso_seccion',
            'situacionRevistaDocente': 'id_situacion_revista',
            'estadoAlumno': 'id_estado',
            'motivoBajaAlumno': 'id_motivo_baja',
            'condicionMateria': 'id_condicion',
            'causaInasistenciaAlumnos': 'id_causa',
            'motivoInasistenciasDocentes': 'id_motivo',
            'calendarioAcademico': 'id_calendario'
        };
        return map[catalog] || 'id';
    }
};
exports.CatalogsService = CatalogsService;
exports.CatalogsService = CatalogsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CatalogsService);
//# sourceMappingURL=catalogs.service.js.map