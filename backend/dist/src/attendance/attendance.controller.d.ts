import { AttendanceService } from './attendance.service';
export declare class AttendanceController {
    private readonly attendanceService;
    constructor(attendanceService: AttendanceService);
    registerBulkAttendance(bulkData: any): Promise<{
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
