import { GradesService } from './grades.service';
import { CreateGradeDto } from './dto/create-grade.dto';
import { UpdateGradeDto } from './dto/update-grade.dto';
export declare class GradesController {
    private readonly gradesService;
    constructor(gradesService: GradesService);
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
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
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
    findOne(id: string): import(".prisma/client").Prisma.Prisma__CursadaNotaClient<{
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
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, updateGradeDto: UpdateGradeDto): import(".prisma/client").Prisma.Prisma__CursadaNotaClient<{
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
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
