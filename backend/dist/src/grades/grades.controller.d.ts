import { GradesService } from './grades.service';
import { CreateGradeDto } from './dto/create-grade.dto';
import { UpdateGradeDto } from './dto/update-grade.dto';
export declare class GradesController {
    private readonly gradesService;
    constructor(gradesService: GradesService);
    create(createGradeDto: CreateGradeDto): Promise<{
        id_alumno: number;
        cupof: string;
        ciclo_lectivo: number;
        nota_cuat1: string | null;
        faltas_cuat1: number | null;
        nota_cuat2: string | null;
        faltas_cuat2: number | null;
        condicion_materia: string | null;
        mes_acreditacion: string | null;
        anio_acreditacion: number | null;
        id_cursada: number;
    }>;
    findAll(): import("@prisma/client/runtime/client").PrismaPromise<{
        id_alumno: number;
        cupof: string;
        ciclo_lectivo: number;
        nota_cuat1: string | null;
        faltas_cuat1: number | null;
        nota_cuat2: string | null;
        faltas_cuat2: number | null;
        condicion_materia: string | null;
        mes_acreditacion: string | null;
        anio_acreditacion: number | null;
        id_cursada: number;
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
    }, {}>, "CursadaNota", "findUnique", null> & import("@prisma/client/runtime/client").PrismaPromise<{
        id_alumno: number;
        cupof: string;
        ciclo_lectivo: number;
        nota_cuat1: string | null;
        faltas_cuat1: number | null;
        nota_cuat2: string | null;
        faltas_cuat2: number | null;
        condicion_materia: string | null;
        mes_acreditacion: string | null;
        anio_acreditacion: number | null;
        id_cursada: number;
    } | null>;
    update(id: string, updateGradeDto: UpdateGradeDto): import("@prisma/client/runtime/client").DynamicModelExtensionFluentApi<import(".prisma/client").Prisma.TypeMap<import("@prisma/client/runtime/client").InternalArgs & {
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
    }, {}>, "CursadaNota", "update", never> & import("@prisma/client/runtime/client").PrismaPromise<{
        id_alumno: number;
        cupof: string;
        ciclo_lectivo: number;
        nota_cuat1: string | null;
        faltas_cuat1: number | null;
        nota_cuat2: string | null;
        faltas_cuat2: number | null;
        condicion_materia: string | null;
        mes_acreditacion: string | null;
        anio_acreditacion: number | null;
        id_cursada: number;
    }>;
}
