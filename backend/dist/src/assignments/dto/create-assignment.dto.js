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
exports.CreateAssignmentDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateAssignmentDto {
}
exports.CreateAssignmentDto = CreateAssignmentDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'ID del profesor' }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateAssignmentDto.prototype, "id_profesor", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1234567', description: 'Código CUPOF de la materia' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAssignmentDto.prototype, "cupof", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1A', description: 'Curso o sección asignada' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAssignmentDto.prototype, "curso_seccion", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2023-03-01', description: 'Fecha de toma de posesión' }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateAssignmentDto.prototype, "fecha_posesion", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '2024-03-01', description: 'Fecha de cese' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateAssignmentDto.prototype, "fecha_cese", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'ID de la situación de revista (ej. Titular, Suplente)' }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateAssignmentDto.prototype, "id_situacion_revista", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '20-12345678-9', description: 'CUIL del profesor reemplazado (requerido si es suplente)' }),
    (0, class_validator_1.ValidateIf)(o => o.id_situacion_revista === 3),
    (0, class_validator_1.Matches)(/^\d{2}-\d{8}-\d{1}$/, { message: 'Formato de CUIL inválido' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAssignmentDto.prototype, "cuil_profesor_reemplazado", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 8.5, description: 'Nota de desempeño del profesor' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateAssignmentDto.prototype, "nota_desempeno", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Falta de compromiso', description: 'Fundamentación si la nota es menor a 6' }),
    (0, class_validator_1.ValidateIf)(o => o.nota_desempeno !== undefined && o.nota_desempeno !== null && o.nota_desempeno < 6),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAssignmentDto.prototype, "fundamentacion_baja_nota", void 0);
//# sourceMappingURL=create-assignment.dto.js.map