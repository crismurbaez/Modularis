import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { PrismaService } from '../prisma/prisma.service';
export declare class SubjectsService {
    private prisma;
    constructor(prisma: PrismaService);
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
    findOne(id: number): Promise<{
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
    update(id: number, updateSubjectDto: UpdateSubjectDto): Promise<{
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
    remove(id: number): Promise<{
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
