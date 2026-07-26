import { NotificationsService } from './notifications.service';
export declare class NotificationsController {
    private readonly notificationsService;
    constructor(notificationsService: NotificationsService);
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id_usuario: number | null;
        id_rol: number | null;
        id_notificacion: number;
        titulo: string;
        mensaje: string;
        tipo: string;
        leida: boolean | null;
        fecha_creacion: Date | null;
    }[]>;
    findOne(id: string): import(".prisma/client").Prisma.Prisma__NotificacionClient<{
        id_usuario: number | null;
        id_rol: number | null;
        id_notificacion: number;
        titulo: string;
        mensaje: string;
        tipo: string;
        leida: boolean | null;
        fecha_creacion: Date | null;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, import(".prisma/client").Prisma.PrismaClientOptions>;
    markAsRead(id: string): Promise<{
        id_usuario: number | null;
        id_rol: number | null;
        id_notificacion: number;
        titulo: string;
        mensaje: string;
        tipo: string;
        leida: boolean | null;
        fecha_creacion: Date | null;
    }>;
}
