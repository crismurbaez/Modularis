import { PrismaService } from '../prisma/prisma.service';
export declare class UsersService {
    private readonly prisma;
    private cryptoKey;
    constructor(prisma: PrismaService);
    findAll(): Promise<{
        rol: {
            id_rol: number;
            nombre: string;
            descripcion: string | null;
        };
        id_usuario: number;
        username: string;
        activo: boolean;
        personal: {
            id_personal: number;
            activo: boolean;
            nombre: string;
            dni: string;
            cuil: string;
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
            nombre: string;
            dni: string;
            cuil: string;
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
        id_personal: number | null;
        password_hash: string;
        id_rol: number;
        activo: boolean;
    }>;
    create(data: any): Promise<{
        rol: {
            id_rol: number;
            nombre: string;
            descripcion: string | null;
        };
        id_usuario: number;
        username: string;
        personal: {
            id_personal: number;
            activo: boolean;
            nombre: string;
            dni: string;
            cuil: string;
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
        rol: {
            id_rol: number;
            nombre: string;
            descripcion: string | null;
        };
        id_usuario: number;
    }>;
}
