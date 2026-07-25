import { AssignmentsService } from './assignments.service';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';
export declare class AssignmentsController {
    private readonly assignmentsService;
    constructor(assignmentsService: AssignmentsService);
    create(createAssignmentDto: CreateAssignmentDto): Promise<{
        id_personal: number;
        id_materia: number;
        id_curso_seccion: number | null;
        fecha_posesion: Date | null;
        fecha_cese: Date | null;
        id_situacion_revista: number | null;
        cuil_profesor_reemplazado: string | null;
        nota_desempeno: import("@prisma/client-runtime-utils").Decimal | null;
        fundamentacion_baja_nota: string | null;
        cupof: string | null;
        id_designacion: number;
    }>;
    findAll(): Promise<{
        id_personal: number;
        id_materia: number;
        id_curso_seccion: number | null;
        fecha_posesion: Date | null;
        fecha_cese: Date | null;
        id_situacion_revista: number | null;
        cuil_profesor_reemplazado: string | null;
        nota_desempeno: import("@prisma/client-runtime-utils").Decimal | null;
        fundamentacion_baja_nota: string | null;
        cupof: string | null;
        id_designacion: number;
    }[]>;
    findOne(id: string): Promise<{
        id_personal: number;
        id_materia: number;
        id_curso_seccion: number | null;
        fecha_posesion: Date | null;
        fecha_cese: Date | null;
        id_situacion_revista: number | null;
        cuil_profesor_reemplazado: string | null;
        nota_desempeno: import("@prisma/client-runtime-utils").Decimal | null;
        fundamentacion_baja_nota: string | null;
        cupof: string | null;
        id_designacion: number;
    } | null>;
    update(id: string, updateAssignmentDto: UpdateAssignmentDto): Promise<{
        id_personal: number;
        id_materia: number;
        id_curso_seccion: number | null;
        fecha_posesion: Date | null;
        fecha_cese: Date | null;
        id_situacion_revista: number | null;
        cuil_profesor_reemplazado: string | null;
        nota_desempeno: import("@prisma/client-runtime-utils").Decimal | null;
        fundamentacion_baja_nota: string | null;
        cupof: string | null;
        id_designacion: number;
    }>;
}
