import { OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import 'dotenv/config';
import { CryptoService } from '../crypto/crypto.service';
export declare class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    private cryptoService;
    extended: import("@prisma/client/runtime/client").DynamicClientExtensionThis<import(".prisma/client").Prisma.TypeMap<import("@prisma/client/runtime/client").InternalArgs & {
        result: {
            alumno: {
                dni: () => {
                    compute(data: {
                        dni: string;
                        nombre: string;
                        apellido: string;
                        id_alumno: number;
                        fecha_nacimiento: Date | null;
                        edad: number | null;
                        lugar_nacimiento: string | null;
                        nacionalidad: string | null;
                        primaria_origen: string | null;
                        secundario_incompleto: string | null;
                        analitico_parcial: boolean | null;
                        id_estado: number | null;
                        id_motivo_baja: number | null;
                    }): string;
                };
                nombre: () => {
                    compute(data: {
                        dni: string;
                        nombre: string;
                        apellido: string;
                        id_alumno: number;
                        fecha_nacimiento: Date | null;
                        edad: number | null;
                        lugar_nacimiento: string | null;
                        nacionalidad: string | null;
                        primaria_origen: string | null;
                        secundario_incompleto: string | null;
                        analitico_parcial: boolean | null;
                        id_estado: number | null;
                        id_motivo_baja: number | null;
                    }): string;
                };
                apellido: () => {
                    compute(data: {
                        dni: string;
                        nombre: string;
                        apellido: string;
                        id_alumno: number;
                        fecha_nacimiento: Date | null;
                        edad: number | null;
                        lugar_nacimiento: string | null;
                        nacionalidad: string | null;
                        primaria_origen: string | null;
                        secundario_incompleto: string | null;
                        analitico_parcial: boolean | null;
                        id_estado: number | null;
                        id_motivo_baja: number | null;
                    }): string;
                };
            };
            profesor: {
                dni: () => {
                    compute(data: {
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
                    }): string;
                };
                nombre: () => {
                    compute(data: {
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
                    }): string;
                };
                apellido: () => {
                    compute(data: {
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
                    }): string;
                };
            };
        };
        model: {};
        query: {};
        client: {};
    }, {}>, import(".prisma/client").Prisma.TypeMapCb<import(".prisma/client").Prisma.PrismaClientOptions>, {
        result: {
            alumno: {
                dni: () => {
                    compute(data: {
                        dni: string;
                        nombre: string;
                        apellido: string;
                        id_alumno: number;
                        fecha_nacimiento: Date | null;
                        edad: number | null;
                        lugar_nacimiento: string | null;
                        nacionalidad: string | null;
                        primaria_origen: string | null;
                        secundario_incompleto: string | null;
                        analitico_parcial: boolean | null;
                        id_estado: number | null;
                        id_motivo_baja: number | null;
                    }): string;
                };
                nombre: () => {
                    compute(data: {
                        dni: string;
                        nombre: string;
                        apellido: string;
                        id_alumno: number;
                        fecha_nacimiento: Date | null;
                        edad: number | null;
                        lugar_nacimiento: string | null;
                        nacionalidad: string | null;
                        primaria_origen: string | null;
                        secundario_incompleto: string | null;
                        analitico_parcial: boolean | null;
                        id_estado: number | null;
                        id_motivo_baja: number | null;
                    }): string;
                };
                apellido: () => {
                    compute(data: {
                        dni: string;
                        nombre: string;
                        apellido: string;
                        id_alumno: number;
                        fecha_nacimiento: Date | null;
                        edad: number | null;
                        lugar_nacimiento: string | null;
                        nacionalidad: string | null;
                        primaria_origen: string | null;
                        secundario_incompleto: string | null;
                        analitico_parcial: boolean | null;
                        id_estado: number | null;
                        id_motivo_baja: number | null;
                    }): string;
                };
            };
            profesor: {
                dni: () => {
                    compute(data: {
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
                    }): string;
                };
                nombre: () => {
                    compute(data: {
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
                    }): string;
                };
                apellido: () => {
                    compute(data: {
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
                    }): string;
                };
            };
        };
        model: {};
        query: {};
        client: {};
    }>;
    private pgPool;
    constructor(cryptoService: CryptoService);
    onModuleInit(): Promise<void>;
    onModuleDestroy(): Promise<void>;
}
