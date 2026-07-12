import { Module } from '@nestjs/common';
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

@Module({
  imports: [CryptoModule, PrismaModule, AuthModule, StudentsModule, TeachersModule, AcademicsModule, AssignmentsModule, GradesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
