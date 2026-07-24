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
exports.ConfigAlertasController = void 0;
const common_1 = require("@nestjs/common");
const config_alertas_service_1 = require("./config-alertas.service");
const auth_guard_1 = require("../auth/auth.guard");
const permissions_guard_1 = require("../auth/permissions.guard");
const permissions_decorator_1 = require("../auth/permissions.decorator");
let ConfigAlertasController = class ConfigAlertasController {
    constructor(configAlertasService) {
        this.configAlertasService = configAlertasService;
    }
    findAll() {
        return this.configAlertasService.findAll();
    }
    findOne(tipo) {
        return this.configAlertasService.findOne(tipo);
    }
    upsert(tipo, configData) {
        return this.configAlertasService.upsert(tipo, configData.activa, configData.parametros);
    }
};
exports.ConfigAlertasController = ConfigAlertasController;
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.RequirePermissions)('ACCESO_TOTAL'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ConfigAlertasController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':tipo'),
    (0, permissions_decorator_1.RequirePermissions)('ACCESO_TOTAL'),
    __param(0, (0, common_1.Param)('tipo')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ConfigAlertasController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(':tipo'),
    (0, permissions_decorator_1.RequirePermissions)('ACCESO_TOTAL'),
    __param(0, (0, common_1.Param)('tipo')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ConfigAlertasController.prototype, "upsert", null);
exports.ConfigAlertasController = ConfigAlertasController = __decorate([
    (0, common_1.Controller)('config-alertas'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard, permissions_guard_1.PermissionsGuard),
    __metadata("design:paramtypes", [config_alertas_service_1.ConfigAlertasService])
], ConfigAlertasController);
//# sourceMappingURL=config-alertas.controller.js.map