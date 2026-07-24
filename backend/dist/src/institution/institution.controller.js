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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstitutionController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
const fs = require("fs");
const institution_service_1 = require("./institution.service");
const create_institution_dto_1 = require("./dto/create-institution.dto");
const swagger_1 = require("@nestjs/swagger");
fs.mkdirSync('./uploads/institution', { recursive: true });
let InstitutionController = class InstitutionController {
    constructor(institutionService) {
        this.institutionService = institutionService;
    }
    createOrUpdate(createInstitutionDto, files) {
        return this.institutionService.createOrUpdate(createInstitutionDto, files);
    }
    findOne() {
        return this.institutionService.findOne();
    }
};
exports.InstitutionController = InstitutionController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: 'icono', maxCount: 1 },
        { name: 'imagen_sello', maxCount: 1 },
    ], {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads/institution',
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                cb(null, file.fieldname + '-' + uniqueSuffix + (0, path_1.extname)(file.originalname));
            }
        })
    })),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_institution_dto_1.CreateInstitutionDto, Object]),
    __metadata("design:returntype", void 0)
], InstitutionController.prototype, "createOrUpdate", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], InstitutionController.prototype, "findOne", null);
exports.InstitutionController = InstitutionController = __decorate([
    (0, common_1.Controller)('institution'),
    __metadata("design:paramtypes", [institution_service_1.InstitutionService])
], InstitutionController);
//# sourceMappingURL=institution.controller.js.map