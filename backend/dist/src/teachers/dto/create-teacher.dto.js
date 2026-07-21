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
exports.CreateTeacherDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateTeacherDto {
}
exports.CreateTeacherDto = CreateTeacherDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '12345679', description: 'El DNI del profesor' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTeacherDto.prototype, "dni", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Pepito', description: 'Nombre del profesor' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTeacherDto.prototype, "nombre", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Gómez', description: 'Apellido del profesor' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTeacherDto.prototype, "apellido", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '20-12345679-9', description: 'CUIL del profesor' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTeacherDto.prototype, "cuil", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '1980-05-15', description: 'Fecha de nacimiento' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateTeacherDto.prototype, "fecha_nacimiento", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Calle Falsa 123', description: 'Dirección' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTeacherDto.prototype, "direccion", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'La Plata', description: 'Localidad' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTeacherDto.prototype, "localidad", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Distrito 1', description: 'Distrito' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTeacherDto.prototype, "distrito", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'juan.perez@abc.gob.ar', description: 'Correo abc' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTeacherDto.prototype, "mail_abc", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'juan.perez@gmail.com', description: 'Correo personal' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTeacherDto.prototype, "mail_personal", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '+541123456789', description: 'Teléfono' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTeacherDto.prototype, "telefono", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Profesor de Matemáticas', description: 'Título habilitante' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateTeacherDto.prototype, "titulo_habilitante", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: true, description: '¿Es título docente?' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateTeacherDto.prototype, "titulo_docente", void 0);
//# sourceMappingURL=create-teacher.dto.js.map