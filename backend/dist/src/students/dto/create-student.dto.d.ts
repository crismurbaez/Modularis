export declare class CreateStudentDto {
    dni: string;
    nombre: string;
    apellido: string;
    fecha_nacimiento?: string;
    lugar_nacimiento?: string;
    nacionalidad?: string;
    primaria_origen?: string;
    secundario_incompleto?: string;
    analitico_parcial?: boolean;
    id_estado?: number;
    id_motivo_baja?: number;
}
