import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { CreateAbsenceDto } from './dto/create-absence.dto';
import { PrismaService } from '../prisma/prisma.service';
import { CryptoService } from '../crypto/crypto.service';
export declare class TeachersService {
    private prisma;
    private cryptoService;
    constructor(prisma: PrismaService, cryptoService: CryptoService);
    checkDuplicates(dni: string, cuil: string, idToIgnore?: number): Promise<void>;
    private encryptData;
    private decryptData;
    create(createTeacherDto: CreateTeacherDto): Promise<any>;
    findAll(): Promise<any[]>;
    findOne(id: number): Promise<any>;
    update(id: number, updateTeacherDto: UpdateTeacherDto): Promise<any>;
    addAbsence(id: number, createAbsenceDto: CreateAbsenceDto): Promise<{
        id_personal: number;
        id_inasistencia: number;
        fecha: Date;
        id_motivo: number | null;
        observaciones: string | null;
    }>;
}
