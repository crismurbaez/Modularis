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
exports.GradesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let GradesService = class GradesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createGradeDto) {
        let { condicion_materia, mes_acreditacion, anio_acreditacion, nota_cuat1, nota_cuat2, final_aprobado, ...rest } = createGradeDto;
        const data = {
            ...rest,
            nota_cuat1,
            nota_cuat2,
            condicion_materia,
            mes_acreditacion,
            anio_acreditacion,
        };
        if (condicion_materia === 'APROBADO') {
            if (!mes_acreditacion || !anio_acreditacion) {
                throw new common_1.BadRequestException('Para una materia APROBADA, el mes y año de acreditación son obligatorios.');
            }
        }
        else if (final_aprobado === false) {
            data.mes_acreditacion = null;
            data.anio_acreditacion = null;
        }
        else if (nota_cuat1 && nota_cuat2) {
            const n1 = Number(nota_cuat1);
            const n2 = Number(nota_cuat2);
            if (!isNaN(n1) && !isNaN(n2)) {
                if (n1 >= 4 && n2 >= 4) {
                    data.condicion_materia = 'APROBADO';
                    if (!mes_acreditacion || !anio_acreditacion) {
                        throw new common_1.BadRequestException('Condición calculada como APROBADO: requiere mes y año de acreditación.');
                    }
                }
                else {
                    data.condicion_materia = 'PENDIENTE';
                    data.mes_acreditacion = null;
                    data.anio_acreditacion = null;
                }
            }
        }
        return this.prisma.extended.cursadaNota.create({ data });
    }
    findAll() {
        return this.prisma.extended.cursadaNota.findMany();
    }
    findOne(id) {
        return this.prisma.extended.cursadaNota.findUnique({
            where: { id_cursada: id },
        });
    }
    update(id, data) {
        return this.prisma.extended.cursadaNota.update({
            where: { id_cursada: id },
            data: data,
        });
    }
};
exports.GradesService = GradesService;
exports.GradesService = GradesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], GradesService);
//# sourceMappingURL=grades.service.js.map