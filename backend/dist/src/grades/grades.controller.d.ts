import { GradesService } from './grades.service';
import { CreateGradeDto } from './dto/create-grade.dto';
import { UpdateGradeDto } from './dto/update-grade.dto';
export declare class GradesController {
    private readonly gradesService;
    constructor(gradesService: GradesService);
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
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
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
    findOne(id: string): import(".prisma/client").Prisma.Prisma__CursadaNotaClient<{
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
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    update(id: string, updateGradeDto: UpdateGradeDto): import(".prisma/client").Prisma.Prisma__CursadaNotaClient<{
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
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
}
