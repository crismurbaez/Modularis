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
        id_personal: number;
        id_materia: number;
        curso_seccion: string | null;
        fecha_posesion: Date | null;
        fecha_cese: Date | null;
        id_situacion_revista: number | null;
        cuil_profesor_reemplazado: string | null;
        nota_desempeno: Prisma.Decimal | null;
        fundamentacion_baja_nota: string | null;
        cupof: string | null;
        id_designacion: number;
    }>;
    findAll(): Promise<{
        id_personal: number;
        id_materia: number;
        curso_seccion: string | null;
        fecha_posesion: Date | null;
        fecha_cese: Date | null;
        id_situacion_revista: number | null;
        cuil_profesor_reemplazado: string | null;
        nota_desempeno: Prisma.Decimal | null;
        fundamentacion_baja_nota: string | null;
        cupof: string | null;
        id_designacion: number;
    }[]>;
    findOne(id: number): Promise<{
        id_personal: number;
        id_materia: number;
        curso_seccion: string | null;
        fecha_posesion: Date | null;
        fecha_cese: Date | null;
        id_situacion_revista: number | null;
        cuil_profesor_reemplazado: string | null;
        nota_desempeno: Prisma.Decimal | null;
        fundamentacion_baja_nota: string | null;
        cupof: string | null;
        id_designacion: number;
    } | null>;
    update(id: number, updateAssignmentDto: UpdateAssignmentDto): Promise<{
        id_personal: number;
        id_materia: number;
        curso_seccion: string | null;
        fecha_posesion: Date | null;
        fecha_cese: Date | null;
        id_situacion_revista: number | null;
        cuil_profesor_reemplazado: string | null;
        nota_desempeno: Prisma.Decimal | null;
        fundamentacion_baja_nota: string | null;
        cupof: string | null;
        id_designacion: number;
    }>;
}
