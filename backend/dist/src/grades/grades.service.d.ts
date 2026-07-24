import { CreateGradeDto } from './dto/create-grade.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
export declare class GradesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createGradeDto: CreateGradeDto): Promise<{
        id_alumno: number;
        id_materia: number;
        ciclo_lectivo: number;
        nota_cuat1: string | null;
        faltas_cuat1: number | null;
        nota_cuat2: string | null;
        faltas_cuat2: number | null;
        id_condicion_materia: number | null;
        mes_acreditacion: string | null;
        anio_acreditacion: number | null;
        nota_final: string | null;
        id_cursada: number;
    }>;
    findAll(): Prisma.PrismaPromise<{
        id_alumno: number;
        id_materia: number;
        ciclo_lectivo: number;
        nota_cuat1: string | null;
        faltas_cuat1: number | null;
        nota_cuat2: string | null;
        faltas_cuat2: number | null;
        id_condicion_materia: number | null;
        mes_acreditacion: string | null;
        anio_acreditacion: number | null;
        nota_final: string | null;
        id_cursada: number;
    }[]>;
    findOne(id: number): Prisma.Prisma__CursadaNotaClient<{
        id_alumno: number;
        id_materia: number;
        ciclo_lectivo: number;
        nota_cuat1: string | null;
        faltas_cuat1: number | null;
        nota_cuat2: string | null;
        faltas_cuat2: number | null;
        id_condicion_materia: number | null;
        mes_acreditacion: string | null;
        anio_acreditacion: number | null;
        nota_final: string | null;
        id_cursada: number;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, Prisma.PrismaClientOptions>;
    update(id: number, data: Prisma.CursadaNotaUpdateInput): Prisma.Prisma__CursadaNotaClient<{
        id_alumno: number;
        id_materia: number;
        ciclo_lectivo: number;
        nota_cuat1: string | null;
        faltas_cuat1: number | null;
        nota_cuat2: string | null;
        faltas_cuat2: number | null;
        id_condicion_materia: number | null;
        mes_acreditacion: string | null;
        anio_acreditacion: number | null;
        nota_final: string | null;
        id_cursada: number;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, Prisma.PrismaClientOptions>;
}
