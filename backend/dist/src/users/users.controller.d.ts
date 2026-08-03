import { UsersService } from './users.service';
export declare class CreateUserDto {
    username: string;
    password: string;
    id_rol: number;
    id_personal?: number;
}
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
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
    create(createUserDto: CreateUserDto): Promise<{
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
