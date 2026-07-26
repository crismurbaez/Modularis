import { TeachersService } from './teachers.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { CreateAbsenceDto } from './dto/create-absence.dto';
export declare class TeachersController {
    private readonly teachersService;
    constructor(teachersService: TeachersService);
    create(createTeacherDto: CreateTeacherDto): Promise<any>;
    findAll(): Promise<any[]>;
    findOne(id: string): Promise<any>;
    update(id: string, updateTeacherDto: UpdateTeacherDto): Promise<any>;
    addAbsence(id: string, createAbsenceDto: CreateAbsenceDto): Promise<{
        fecha: Date;
        id_personal: number;
        id_inasistencia: number;
        id_motivo: number | null;
        observaciones: string | null;
    }>;
}
