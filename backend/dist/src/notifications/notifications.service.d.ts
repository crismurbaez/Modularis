import { PrismaService } from '../prisma/prisma.service';
export declare class NotificationsService {
    private prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    checkCierreNotas(): Promise<void>;
    checkInasistencias(): Promise<void>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id_usuario: number | null;
        id_rol: number | null;
        titulo: string;
        mensaje: string;
        tipo: string;
        leida: boolean | null;
        fecha_creacion: Date | null;
        id_notificacion: number;
    }[]>;
    findOne(id: number): import(".prisma/client").Prisma.Prisma__NotificacionClient<{
        id_usuario: number | null;
        id_rol: number | null;
        titulo: string;
        mensaje: string;
        tipo: string;
        leida: boolean | null;
        fecha_creacion: Date | null;
        id_notificacion: number;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    markAsRead(id: number): Promise<{
        id_usuario: number | null;
        id_rol: number | null;
        titulo: string;
        mensaje: string;
        tipo: string;
        leida: boolean | null;
        fecha_creacion: Date | null;
        id_notificacion: number;
    }>;
}
