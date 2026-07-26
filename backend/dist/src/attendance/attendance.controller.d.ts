import { AttendanceService } from './attendance.service';
export declare class AttendanceController {
    private readonly attendanceService;
    constructor(attendanceService: AttendanceService);
    registerBulkAttendance(bulkData: any): Promise<{
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
