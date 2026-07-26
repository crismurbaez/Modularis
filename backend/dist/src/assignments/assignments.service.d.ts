import { PrismaService } from '../prisma/prisma.service';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';
import { Prisma } from '@prisma/client';
import { CryptoService } from '../crypto/crypto.service';
import { NotificationsService } from '../notifications/notifications.service';
export declare class AssignmentsService {
    private prisma;
    private cryptoService;
    private notificationsService;
    constructor(prisma: PrismaService, cryptoService: CryptoService, notificationsService: NotificationsService);
    create(createAssignmentDto: CreateAssignmentDto): Promise<{
        id_curso_seccion: number | null;
        id_personal: number;
        id_materia: number;
        cupof: string | null;
        fecha_posesion: Date | null;
        fecha_cese: Date | null;
        cuil_profesor_reemplazado: string | null;
        nota_desempeno: Prisma.Decimal | null;
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
        nota_desempeno: Prisma.Decimal | null;
        fundamentacion_baja_nota: string | null;
        id_designacion: number;
        id_situacion_revista: number | null;
    }[]>;
    findOne(id: number): Promise<{
        id_curso_seccion: number | null;
        id_personal: number;
        id_materia: number;
        cupof: string | null;
        fecha_posesion: Date | null;
        fecha_cese: Date | null;
        cuil_profesor_reemplazado: string | null;
        nota_desempeno: Prisma.Decimal | null;
        fundamentacion_baja_nota: string | null;
        id_designacion: number;
        id_situacion_revista: number | null;
    } | null>;
    update(id: number, updateAssignmentDto: UpdateAssignmentDto): Promise<{
        id_curso_seccion: number | null;
        id_personal: number;
        id_materia: number;
        cupof: string | null;
        fecha_posesion: Date | null;
        fecha_cese: Date | null;
        cuil_profesor_reemplazado: string | null;
        nota_desempeno: Prisma.Decimal | null;
        fundamentacion_baja_nota: string | null;
        id_designacion: number;
        id_situacion_revista: number | null;
    }>;
}
