import { CreateGradeDto } from './dto/create-grade.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
export declare class GradesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createGradeDto: CreateGradeDto): Promise<{
        ciclo_lectivo: number;
        nota_cuat1: string | null;
        faltas_cuat1: number | null;
        nota_cuat2: string | null;
        faltas_cuat2: number | null;
        nota_final: string | null;
        mes_acreditacion: string | null;
        anio_acreditacion: number | null;
        id_cursada: number;
        id_alumno: number;
        id_materia: number;
        id_condicion_materia: number | null;
    }>;
    findAll(): Prisma.PrismaPromise<{
        ciclo_lectivo: number;
        nota_cuat1: string | null;
        faltas_cuat1: number | null;
        nota_cuat2: string | null;
        faltas_cuat2: number | null;
        nota_final: string | null;
        mes_acreditacion: string | null;
        anio_acreditacion: number | null;
        id_cursada: number;
        id_alumno: number;
        id_materia: number;
        id_condicion_materia: number | null;
    }[]>;
    findOne(id: number): Prisma.Prisma__CursadaNotaClient<{
        ciclo_lectivo: number;
        nota_cuat1: string | null;
        faltas_cuat1: number | null;
        nota_cuat2: string | null;
        faltas_cuat2: number | null;
        nota_final: string | null;
        mes_acreditacion: string | null;
        anio_acreditacion: number | null;
        id_cursada: number;
        id_alumno: number;
        id_materia: number;
        id_condicion_materia: number | null;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, Prisma.PrismaClientOptions>;
    update(id: number, data: Prisma.CursadaNotaUpdateInput): Prisma.Prisma__CursadaNotaClient<{
        ciclo_lectivo: number;
        nota_cuat1: string | null;
        faltas_cuat1: number | null;
        nota_cuat2: string | null;
        faltas_cuat2: number | null;
        nota_final: string | null;
        mes_acreditacion: string | null;
        anio_acreditacion: number | null;
        id_cursada: number;
        id_alumno: number;
        id_materia: number;
        id_condicion_materia: number | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, Prisma.PrismaClientOptions>;
}
