import { AssignmentsService } from './assignments.service';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';
export declare class AssignmentsController {
    private readonly assignmentsService;
    constructor(assignmentsService: AssignmentsService);
    create(createAssignmentDto: CreateAssignmentDto): Promise<{
        id_curso_seccion: number | null;
        id_personal: number;
        id_materia: number;
        cupof: string | null;
        fecha_posesion: Date | null;
        fecha_cese: Date | null;
        cuil_profesor_reemplazado: string | null;
        nota_desempeno: import("@prisma/client-runtime-utils").Decimal | null;
        fundamentacion_baja_nota: string | null;
        id_designacion: number;
        id_situacion_revista: number | null;
    }>;
    findAll(): Promise<{
        id_curso_seccion: number | null;
        id_personal: number;
        id_materia: number;
        cupof: string | null;
        fecha_posesion: Date | null;
        fecha_cese: Date | null;
        cuil_profesor_reemplazado: string | null;
        nota_desempeno: import("@prisma/client-runtime-utils").Decimal | null;
        fundamentacion_baja_nota: string | null;
        id_designacion: number;
        id_situacion_revista: number | null;
    }[]>;
    findOne(id: string): Promise<{
        id_curso_seccion: number | null;
        id_personal: number;
        id_materia: number;
        cupof: string | null;
        fecha_posesion: Date | null;
        fecha_cese: Date | null;
        cuil_profesor_reemplazado: string | null;
        nota_desempeno: import("@prisma/client-runtime-utils").Decimal | null;
        fundamentacion_baja_nota: string | null;
        id_designacion: number;
        id_situacion_revista: number | null;
    } | null>;
    update(id: string, updateAssignmentDto: UpdateAssignmentDto): Promise<{
        id_curso_seccion: number | null;
        id_personal: number;
        id_materia: number;
        cupof: string | null;
        fecha_posesion: Date | null;
        fecha_cese: Date | null;
        cuil_profesor_reemplazado: string | null;
        nota_desempeno: import("@prisma/client-runtime-utils").Decimal | null;
        fundamentacion_baja_nota: string | null;
        id_designacion: number;
        id_situacion_revista: number | null;
    }>;
}
