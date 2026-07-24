import { PrismaService } from '../prisma/prisma.service';
export declare class UsersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<{
        id_usuario: number;
        username: string;
        activo: boolean;
        rol: {
            id_rol: number;
            nombre: string;
            descripcion: string | null;
        };
        personal: {
            id_personal: number;
            activo: boolean;
            dni: string;
            cuil: string;
            nombre: string;
            apellido: string;
            fecha_nacimiento: string | null;
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
            id_rol: number;
            nombre: string;
            descripcion: string | null;
        };
        personal: {
            id_personal: number;
            activo: boolean;
            dni: string;
            cuil: string;
            nombre: string;
            apellido: string;
            fecha_nacimiento: string | null;
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
        username: string;
        password_hash: string;
        id_rol: number;
        id_personal: number | null;
        activo: boolean;
    }>;
    create(data: any): Promise<{
        id_usuario: number;
        username: string;
        rol: {
            id_rol: number;
            nombre: string;
            descripcion: string | null;
        };
        personal: {
            id_personal: number;
            activo: boolean;
            dni: string;
            cuil: string;
            nombre: string;
            apellido: string;
            fecha_nacimiento: string | null;
            direccion: string | null;
            localidad: string | null;
            distrito: string | null;
            mail_abc: string | null;
            mail_personal: string | null;
            telefono: string | null;
            titulo_habilitante: string | null;
            titulo_docente: boolean | null;
        } | null;
    }>;
    updateStatus(id: number, activo: boolean): Promise<{
        id_usuario: number;
        activo: boolean;
    }>;
    updateRole(id: number, id_rol: number): Promise<{
        id_usuario: number;
        rol: {
            id_rol: number;
            nombre: string;
            descripcion: string | null;
        };
    }>;
}
