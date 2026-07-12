import { PrismaService } from '../prisma/prisma.service';
export declare class UsersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<{
        id_usuario: number;
        dni: string;
        nombre: string | null;
        apellido: string | null;
        activo: boolean;
        rol: {
            nombre: string;
            id_rol: number;
            descripcion: string | null;
        };
        profesor: {
            dni: string;
            nombre: string;
            apellido: string;
            id_profesor: number;
            activo: boolean;
            fecha_nacimiento: Date | null;
            cuil: string;
            direccion: string | null;
            localidad: string | null;
            distrito: string | null;
            mail_abc: string | null;
            mail_personal: string | null;
            telefono: string | null;
            titulo_habilitante: string | null;
            titulo_docente: boolean | null;
        } | null;
    }[]>;
    findOne(id: number): Promise<{
        rol: {
            nombre: string;
            id_rol: number;
            descripcion: string | null;
        };
        profesor: {
            dni: string;
            nombre: string;
            apellido: string;
            id_profesor: number;
            activo: boolean;
            fecha_nacimiento: Date | null;
            cuil: string;
            direccion: string | null;
            localidad: string | null;
            distrito: string | null;
            mail_abc: string | null;
            mail_personal: string | null;
            telefono: string | null;
            titulo_habilitante: string | null;
            titulo_docente: boolean | null;
        } | null;
    } & {
        id_usuario: number;
        dni: string;
        password_hash: string;
        nombre: string | null;
        apellido: string | null;
        id_rol: number;
        id_profesor: number | null;
        activo: boolean;
    }>;
    create(data: any): Promise<{
        id_usuario: number;
        dni: string;
        nombre: string | null;
        apellido: string | null;
    }>;
    updateStatus(id: number, activo: boolean): Promise<{
        id_usuario: number;
        activo: boolean;
    }>;
    updateRole(id: number, id_rol: number): Promise<{
        id_usuario: number;
        rol: {
            nombre: string;
            id_rol: number;
            descripcion: string | null;
        };
    }>;
}
