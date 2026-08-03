import { PrismaService } from '../prisma/prisma.service';
export declare class AttendanceService {
    private prisma;
    constructor(prisma: PrismaService);
    registerBulk(bulkData: any): Promise<{
        success: boolean;
        estado: {
            id_usuario: number;
            id_estado: number;
            fecha: Date;
            id_curso_seccion: number;
        };
    }>;
    getCalendar(month: string, year: string): Promise<{
        id_calendario: number;
        evento: string;
        fecha_inicio: Date;
        fecha_fin: Date | null;
    }[]>;
}
