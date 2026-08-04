import { SubjectsService } from './subjects.service';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
export declare class SubjectsController {
    private readonly subjectsService;
    constructor(subjectsService: SubjectsService);
    create(createSubjectDto: CreateSubjectDto): Promise<{
        activo: boolean;
        modulo: string | null;
        id_materia: number;
        id_orientacion: number | null;
        materia_nombre: string;
        area: string | null;
        anio: number | null;
        horas_catedra: number | null;
        codigo_pid: string | null;
    }>;
    findAll(): Promise<{
        activo: boolean;
        modulo: string | null;
        id_materia: number;
        id_orientacion: number | null;
        materia_nombre: string;
        area: string | null;
        anio: number | null;
        horas_catedra: number | null;
        codigo_pid: string | null;
    }[]>;
    findOne(id: string): Promise<{
        activo: boolean;
        modulo: string | null;
        id_materia: number;
        id_orientacion: number | null;
        materia_nombre: string;
        area: string | null;
        anio: number | null;
        horas_catedra: number | null;
        codigo_pid: string | null;
    }>;
    update(id: string, updateSubjectDto: UpdateSubjectDto): Promise<{
        activo: boolean;
        modulo: string | null;
        id_materia: number;
        id_orientacion: number | null;
        materia_nombre: string;
        area: string | null;
        anio: number | null;
        horas_catedra: number | null;
        codigo_pid: string | null;
    }>;
    remove(id: string): Promise<{
        activo: boolean;
        modulo: string | null;
        id_materia: number;
        id_orientacion: number | null;
        materia_nombre: string;
        area: string | null;
        anio: number | null;
        horas_catedra: number | null;
        codigo_pid: string | null;
    }>;
}
