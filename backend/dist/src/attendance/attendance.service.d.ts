import { PrismaService } from '../prisma/prisma.service';
export declare class AttendanceService {
    private prisma;
    constructor(prisma: PrismaService);
    registerBulk(bulkData: any): Promise<{
        success: boolean;
        estado: {
            fecha: Date;
            id_estado: number;
            id_curso_seccion: number;
            id_usuario: number;
        };
    }>;
    getCalendar(month: string, year: string): Promise<{
        id_calendario: number;
        evento: string;
        fecha_inicio: Date;
        fecha_fin: Date | null;
    }[]>;
}
