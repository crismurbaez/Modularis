import { UsersService } from './users.service';
export declare class CreateUserDto {
    dni: string;
    password: string;
    nombre: string;
    apellido: string;
    id_rol: number;
    id_profesor?: number;
}
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
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
            cuil: string;
            fecha_nacimiento: Date | null;
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
