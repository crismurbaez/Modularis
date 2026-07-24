import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { MailerModule } from '@nestjs-modules/mailer';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CryptoModule } from './crypto/crypto.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { StudentsModule } from './students/students.module';
import { TeachersModule } from './teachers/teachers.module';
import { AcademicsModule } from './academics/academics.module';
import { AssignmentsModule } from './assignments/assignments.module';
import { GradesModule } from './grades/grades.module';
import { UsersModule } from './users/users.module';
import { InstitutionModule } from './institution/institution.module';
import { AttendanceModule } from './attendance/attendance.module';
import { NotificationsModule } from './notifications/notifications.module';
import { AuditModule } from './audit/audit.module';
import { ConfigAlertasModule } from './config-alertas/config-alertas.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    MailerModule.forRoot({
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
    CryptoModule, PrismaModule, AuthModule, UsersModule, StudentsModule, TeachersModule, AcademicsModule, AssignmentsModule, GradesModule, InstitutionModule, AttendanceModule, NotificationsModule, AuditModule, ConfigAlertasModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
