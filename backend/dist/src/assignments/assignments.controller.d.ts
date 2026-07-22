import { AssignmentsService } from './assignments.service';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';
export declare class AssignmentsController {
    private readonly assignmentsService;
    constructor(assignmentsService: AssignmentsService);
    create(createAssignmentDto: CreateAssignmentDto): Promise<{
        id_profesor: number;
        curso_seccion: string | null;
        fecha_posesion: Date | null;
        fecha_cese: Date | null;
        cuil_profesor_reemplazado: string | null;
        nota_desempeno: import("@prisma/client-runtime-utils").Decimal | null;
        fundamentacion_baja_nota: string | null;
        id_designacion: number;
        cupof: string;
        id_situacion_revista: number | null;
    }>;
    findAll(): import("@prisma/client/runtime/client").PrismaPromise<{
        id_profesor: number;
        curso_seccion: string | null;
        fecha_posesion: Date | null;
        fecha_cese: Date | null;
        cuil_profesor_reemplazado: string | null;
        nota_desempeno: import("@prisma/client-runtime-utils").Decimal | null;
        fundamentacion_baja_nota: string | null;
        id_designacion: number;
        cupof: string;
        id_situacion_revista: number | null;
    }[]>;
    findOne(id: string): import("@prisma/client/runtime/client").DynamicModelExtensionFluentApi<import(".prisma/client").Prisma.TypeMap<import("@prisma/client/runtime/client").InternalArgs & {
        result: {
            alumno: {
                dni: () => {
                    compute(data: {
                        dni: string;
                        nombre: string;
                        apellido: string;
                        id_alumno: number;
                        fecha_nacimiento: Date | null;
                        edad: number | null;
                        lugar_nacimiento: string | null;
                        nacionalidad: string | null;
                        primaria_origen: string | null;
                        secundario_incompleto: string | null;
                        analitico_parcial: boolean | null;
                        id_estado: number | null;
                        id_motivo_baja: number | null;
                    }): string;
                };
                nombre: () => {
                    compute(data: {
                        dni: string;
                        nombre: string;
                        apellido: string;
                        id_alumno: number;
                        fecha_nacimiento: Date | null;
                        edad: number | null;
                        lugar_nacimiento: string | null;
                        nacionalidad: string | null;
                        primaria_origen: string | null;
                        secundario_incompleto: string | null;
                        analitico_parcial: boolean | null;
                        id_estado: number | null;
                        id_motivo_baja: number | null;
                    }): string;
                };
                apellido: () => {
                    compute(data: {
                        dni: string;
                        nombre: string;
                        apellido: string;
                        id_alumno: number;
                        fecha_nacimiento: Date | null;
                        edad: number | null;
                        lugar_nacimiento: string | null;
                        nacionalidad: string | null;
                        primaria_origen: string | null;
                        secundario_incompleto: string | null;
                        analitico_parcial: boolean | null;
                        id_estado: number | null;
                        id_motivo_baja: number | null;
                    }): string;
                };
            };
            profesor: {
                dni: () => {
                    compute(data: {
                        dni: string;
                        nombre: string;
                        apellido: string;
                        id_profesor: number;
                        activo: boolean;
                        fecha_nacimiento: Date | null;
                        cuil: string;
                        direccion: string | null;
                        localidad: string | null;
                        distrito: string | null;
                        mail_abc: string | null;
                        mail_personal: string | null;
                        telefono: string | null;
                        titulo_habilitante: string | null;
                        titulo_docente: boolean | null;
                    }): string;
                };
                nombre: () => {
                    compute(data: {
                        dni: string;
                        nombre: string;
                        apellido: string;
                        id_profesor: number;
                        activo: boolean;
                        fecha_nacimiento: Date | null;
                        cuil: string;
                        direccion: string | null;
                        localidad: string | null;
                        distrito: string | null;
                        mail_abc: string | null;
                        mail_personal: string | null;
                        telefono: string | null;
                        titulo_habilitante: string | null;
                        titulo_docente: boolean | null;
                    }): string;
                };
                apellido: () => {
                    compute(data: {
                        dni: string;
                        nombre: string;
                        apellido: string;
                        id_profesor: number;
                        activo: boolean;
                        fecha_nacimiento: Date | null;
                        cuil: string;
                        direccion: string | null;
                        localidad: string | null;
                        distrito: string | null;
                        mail_abc: string | null;
                        mail_personal: string | null;
                        telefono: string | null;
                        titulo_habilitante: string | null;
                        titulo_docente: boolean | null;
                    }): string;
                };
            };
        };
        model: {};
        query: {};
        client: {};
    }, {}>, "Designacion", "findUnique", null> & import("@prisma/client/runtime/client").PrismaPromise<{
        id_profesor: number;
        curso_seccion: string | null;
        fecha_posesion: Date | null;
        fecha_cese: Date | null;
        cuil_profesor_reemplazado: string | null;
        nota_desempeno: import("@prisma/client-runtime-utils").Decimal | null;
        fundamentacion_baja_nota: string | null;
        id_designacion: number;
        cupof: string;
        id_situacion_revista: number | null;
    } | null>;
    update(id: string, updateAssignmentDto: UpdateAssignmentDto): Promise<{
        id_profesor: number;
        curso_seccion: string | null;
        fecha_posesion: Date | null;
        fecha_cese: Date | null;
        cuil_profesor_reemplazado: string | null;
        nota_desempeno: import("@prisma/client-runtime-utils").Decimal | null;
        fundamentacion_baja_nota: string | null;
        id_designacion: number;
        cupof: string;
        id_situacion_revista: number | null;
    }>;
}
