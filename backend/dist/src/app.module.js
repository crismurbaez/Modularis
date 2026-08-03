"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const mailer_1 = require("@nestjs-modules/mailer");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const crypto_module_1 = require("./crypto/crypto.module");
const prisma_module_1 = require("./prisma/prisma.module");
const auth_module_1 = require("./auth/auth.module");
const students_module_1 = require("./students/students.module");
const staff_module_1 = require("./staff/staff.module");
const academics_module_1 = require("./academics/academics.module");
const assignments_module_1 = require("./assignments/assignments.module");
const grades_module_1 = require("./grades/grades.module");
const users_module_1 = require("./users/users.module");
const institution_module_1 = require("./institution/institution.module");
const attendance_module_1 = require("./attendance/attendance.module");
const notifications_module_1 = require("./notifications/notifications.module");
const audit_module_1 = require("./audit/audit.module");
const config_alertas_module_1 = require("./config-alertas/config-alertas.module");
const catalogs_module_1 = require("./catalogs/catalogs.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            schedule_1.ScheduleModule.forRoot(),
            mailer_1.MailerModule.forRoot({
                transport: {
                    host: process.env.SMTP_HOST,
                    port: Number(process.env.SMTP_PORT) || 587,
                    secure: false,
                    auth: {
                        user: process.env.SMTP_USER,
                        pass: process.env.SMTP_PASS,
                    },
                },
                defaults: {
                    from: '"Modularis CENS" <noreply@modularis.com>',
                },
            }),
            crypto_module_1.CryptoModule, prisma_module_1.PrismaModule, auth_module_1.AuthModule, users_module_1.UsersModule, students_module_1.StudentsModule, staff_module_1.StaffModule, academics_module_1.AcademicsModule, assignments_module_1.AssignmentsModule, grades_module_1.GradesModule, institution_module_1.InstitutionModule, attendance_module_1.AttendanceModule, notifications_module_1.NotificationsModule, audit_module_1.AuditModule, config_alertas_module_1.ConfigAlertasModule, catalogs_module_1.CatalogsModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map